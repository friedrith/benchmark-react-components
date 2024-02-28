export interface ComponentProps {
  value: number
}

export default function ComponentA({ value }: ComponentProps) {
  const newValue = Array.from({ length: 10000 }, (_, i) => i).reduce(
    (acc, curr) => acc + curr,
    0
  )

  return (
    <div className='container' data-testid={`component-${value}`}>
      {newValue}
    </div>
  )
}
