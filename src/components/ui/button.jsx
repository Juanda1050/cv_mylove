import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: 'btn-default',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function Button({ className, variant, ...props }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />
}
