type IconProps = {
  name: string
  className?: string
}

export const Icon = ({ name, className }: IconProps) => (
  <svg className={className}>
    <use href={`/icons.svg#${name}`} />
  </svg>
)
