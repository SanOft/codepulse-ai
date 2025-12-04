/** @format */

import axios from 'axios'
import { PullRequest, Repository, PRFile } from '../types/index.js'

export class GitHubService {
  private baseUrl = 'https://api.github.com'

  async getRepositories(token: string): Promise<Repository[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/user/repos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          per_page: 100,
          sort: 'updated',
          direction: 'desc',
        },
      })

      return response.data.map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        private: repo.private,
        defaultBranch: repo.default_branch,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
      }))
    } catch (error) {
      console.error('Error fetching repositories:', error)
      throw error
    }
  }

  async getPullRequests(
    token: string,
    owner: string,
    repo: string,
    state: 'open' | 'closed' | 'all' = 'open'
  ): Promise<PullRequest[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}/pulls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: {
            state,
            per_page: 100,
            sort: 'updated',
            direction: 'desc',
          },
        }
      )

      return response.data.map((pr: any) => ({
        id: pr.id.toString(),
        number: pr.number,
        title: pr.title,
        body: pr.body,
        state: pr.state,
        author: pr.user.login,
        authorAvatar: pr.user.avatar_url,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        mergedAt: pr.merged_at,
        head: {
          ref: pr.head.ref,
          sha: pr.head.sha,
        },
        base: {
          ref: pr.base.ref,
          sha: pr.base.sha,
        },
        repository: {
          owner: owner,
          name: repo,
          fullName: `${owner}/${repo}`,
        },
        url: pr.html_url,
        diffUrl: pr.diff_url,
      }))
    } catch (error) {
      console.error('Error fetching pull requests:', error)
      throw error
    }
  }

  async getPRDiff(
    token: string,
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3.diff',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching PR diff:', error)
      throw error
    }
  }

  async getPRFiles(
    token: string,
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<PRFile[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      return response.data.map((file: any) => ({
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch || '',
        blobUrl: file.blob_url,
        rawUrl: file.raw_url,
      }))
    } catch (error) {
      console.error('Error fetching PR files:', error)
      throw error
    }
  }

  async getFileContent(
    token: string,
    owner: string,
    repo: string,
    path: string,
    ref?: string
  ): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: ref ? { ref } : {},
        }
      )

      // Decode base64 content
      if (response.data.encoding === 'base64') {
        return Buffer.from(response.data.content, 'base64').toString('utf-8')
      }

      return response.data.content
    } catch (error) {
      console.error('Error fetching file content:', error)
      throw error
    }
  }

  async searchCodeInRepository(
    token: string,
    owner: string,
    repo: string,
    query: string
  ): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/search/code`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          q: `${query} repo:${owner}/${repo}`,
        },
      })

      return response.data.items || []
    } catch (error) {
      console.error('Error searching code:', error)
      throw error
    }
  }
}
