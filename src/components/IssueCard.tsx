import React from "react";
import { Issue } from "../models"


export function IssueCard({ issue }: { issue: Issue }) {

  return (
    <div className="border-gray-500 bg-bestGray-dark px-8 mx-8 border rounded-md my-4">
      <h3>{issue.getTitle()}</h3>
      <p className="mt-1 mb-8">{issue.getDescription()}</p>
    </div>
  )

}