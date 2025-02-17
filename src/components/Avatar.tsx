import React from "react";

interface AvatarProps {
  className?: string;
}

export default function Avatar({ className }: AvatarProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div>Test</div>
      </div>
    </div>
  );
}
