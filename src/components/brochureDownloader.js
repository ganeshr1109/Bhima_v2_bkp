// =========================================================
// BROCHURE DOWNLOAD
// =========================================================

const brochureFolders = {
  px4: 'bhima_px4',
  c310: 'bhima_c310',
  trolley: 'bhima_trolley',
  lowbed: 'bhima_low_bed',
}

const brochureFiles = import.meta.glob(
  '../assets/pdf/*/*.pdf',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
)

const downloadBrochures = async (vehicle) => {
  try {
    const folderName = brochureFolders[vehicle.slug]

    if (!folderName) {
      alert('Brochure not available.')
      return
    }

    const files = Object.entries(brochureFiles).filter(
      ([filePath]) => filePath.includes(`/pdf/${folderName}/`)
    )

    if (files.length === 0) {
      alert('Brochure not available.')
      return
    }

    const zip = new JSZip()

    for (const [filePath, fileUrl] of files) {
      const response = await fetch(fileUrl)

      if (!response.ok) {
        console.error('Unable to load PDF:', filePath)
        continue
      }

      const blob = await response.blob()
      const fileName = filePath.split('/').pop()

      zip.file(fileName, blob)
    }

    if (Object.keys(zip.files).length === 0) {
      alert('Brochure not available.')
      return
    }

    const zipBlob = await zip.generateAsync({
      type: 'blob',
    })

    const downloadUrl = URL.createObjectURL(zipBlob)

    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `${vehicle.slug}-brochures.zip`

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Brochure download failed:', error)
    alert('Unable to download brochures.')
  }
}