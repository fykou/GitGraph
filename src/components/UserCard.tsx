import React from 'react'
import { User } from '../models'

export function UserCard({ user, commits }: { user: User, commits: number }) {

  return (
    <div className="card">
      <h3 className="pb-5 text-xl font-bold">{user.getName()}</h3>
      <p className="pt-0">Number of commits in master branch: {commits}</p>
      <img src={user.getAvatarUrl()} alt="avatar" width="75" height="75" className="margin-auto" />
    </div>
  )
}