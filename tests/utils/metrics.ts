const rawMetrics = []

const metricsToExtract = ['ProcessTime', 'JSHeapUsedSize', 'JSHeapTotalSize']

type VersionedMetrics = Record<string, Record<string, number>>

const versionedMetrics: VersionedMetrics = {}

export const extractMetrics = (
  metrics: Array<{ name: string; value: number }>,
  metricsToGet: string[]
) =>
  metrics.reduce((acc, metric) => {
    if (metricsToGet.includes(metric.name)) {
      return {
        ...acc,
        [metric.name]: metric.value,
      }
    }
    return acc
  }, {} as Record<string, number>)

export const addMetrics = (
  version: string,
  metrics: Array<{ name: string; value: number }>
) => {
  rawMetrics.push({ version, metrics })

  const extractedMetrics = extractMetrics(metrics, metricsToExtract)

  versionedMetrics[version] = {
    count: (versionedMetrics[version]?.count ?? 0) + 1,
    ProcessTime:
      (versionedMetrics[version]?.ProcessTime ?? 0) +
      extractedMetrics.ProcessTime,
    JSHeapUsedSize:
      (versionedMetrics[version]?.JSHeapUsedSize ?? 0) +
      extractedMetrics.JSHeapUsedSize,
    JSHeapTotalSize:
      (versionedMetrics[version]?.JSHeapTotalSize ?? 0) +
      extractedMetrics.JSHeapTotalSize,
  }
}

export const getMetrics = () => versionedMetrics
