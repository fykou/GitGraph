import React from "react";
import { Issue } from "../models"

export function IssueCard({ issue }: { issue: Issue }) {

  return (
    <div className="card">
      <h3 className="text-xl font-bold">{issue.getTitle()}</h3>
      <p className="mt-1 mb-8">{issue.getDescription()}</p>
    </div>
  )
}