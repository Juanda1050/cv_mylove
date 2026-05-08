import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/utils'

export function Progress({ className, value = 0, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={cn('progress-root', className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="progress-indicator"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}