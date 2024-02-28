export interface ComponentProps {
  value: number
}

export default function ComponentA({ value }: ComponentProps) {
  return (
    <div className='container' data-testid={`component-${value}`}>
      {value}
    </div>
  )
}
