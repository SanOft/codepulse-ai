/** @format */

interface PullRequest {
  id: string
  number: number
  title: string
  repository: {
    owner: string
    name: string
    fullName: string
  }
  author: string
  createdAt: string
  url: string
}

interface TrackedRepository {
  id: string
  fullName: string
  owner: string
  name: string
}

export class PRMonitorService {
  private checkInterval: number = 5 * 60 * 1000 // 5 minutes
  private intervalId: NodeJS.Timeout | null = null
  private lastCheckedPRs: Map<string, Set<number>> = new Map()
  private callbacks: Array<(pr: PullRequest) => void> = []

  startMonitoring() {
    if (this.intervalId) {
      return // Already monitoring
    }

    // Initial check
    this.checkForNewPRs()

    // Set up interval
    this.intervalId = setInterval(() => {
      this.checkForNewPRs()
    }, this.checkInterval)
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  onNewPR(callback: (pr: PullRequest) => void) {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback)
    }
  }

  private async checkForNewPRs() {
    const token = localStorage.getItem('github_access_token')
    if (!token) {
      return
    }

    const trackedRepos = JSON.parse(
      localStorage.getItem('github_tracked_repositories') || '[]'
    ) as TrackedRepository[]

    if (trackedRepos.length === 0) {
      return
    }

    for (const repo of trackedRepos) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/github/repos/${repo.owner}/${repo.name}/pulls?state=open`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          continue
        }

        const data = await response.json()
        const prs: PullRequest[] = data.data || []

        const repoKey = repo.fullName
        const knownPRs = this.lastCheckedPRs.get(repoKey) || new Set()

        // Find new PRs
        for (const pr of prs) {
          if (!knownPRs.has(pr.number)) {
            // New PR found!
            knownPRs.add(pr.number)
            this.notifyNewPR(pr)
          }
        }

        // Update known PRs
        this.lastCheckedPRs.set(repoKey, knownPRs)
      } catch (error) {
        console.error(`Error checking PRs for ${repo.fullName}:`, error)
      }
    }
  }

  private notifyNewPR(pr: PullRequest) {
    // Store notification in localStorage
    const notifications = JSON.parse(
      localStorage.getItem('github_pr_notifications') || '[]'
    )
    notifications.push({
      ...pr,
      notifiedAt: Date.now(),
      viewed: false,
    })
    localStorage.setItem(
      'github_pr_notifications',
      JSON.stringify(notifications)
    )

    // Call all callbacks
    this.callbacks.forEach((callback) => callback(pr))
  }

  getUnreadNotifications(): PullRequest[] {
    const notifications = JSON.parse(
      localStorage.getItem('github_pr_notifications') || '[]'
    )
    return notifications.filter((n: any) => !n.viewed)
  }

  markAsRead(prNumber: number) {
    const notifications = JSON.parse(
      localStorage.getItem('github_pr_notifications') || '[]'
    )
    const updated = notifications.map((n: any) =>
      n.number === prNumber ? { ...n, viewed: true } : n
    )
    localStorage.setItem('github_pr_notifications', JSON.stringify(updated))
  }
}

export const prMonitorService = new PRMonitorService()
