import React from 'react'
import { User } from '../models'

export function UserCard({ user }: { user: User }) {

  return (
    <div className="card">
      <h3>{user.getName()}</h3>
      <img src={user.getAvatarUrl()} alt="avatar" width="75" height="75" className="margin-auto" />
    </div>
  )
}