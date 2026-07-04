import { useRef, useState, useEffect } from 'react'

function aceptarTexto(accept) {
  const mimeMap = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WEBP',
    'application/pdf': 'PDF',
  }
  return accept.split(',').map(t => mimeMap[t.trim()] || t.trim()).join(', ')
}

function Dropzone({ files, onFilesChange, maxSizeMB = 5, accept = 'image/jpeg,image/png,image/webp,application/pdf', minWidth, minHeight, maxFiles = Infinity }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileError, setFileError] = useState('')
  const [previews, setPreviews] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    const urls = files.map(file => {
      if (file.type?.startsWith('image/')) {
        return URL.createObjectURL(file)
      }
      return null
    })
    setPreviews(urls)
    return () => {
      urls.forEach(url => { if (url) URL.revokeObjectURL(url) })
    }
  }, [files])

  const addFiles = async (fileList) => {
    setFileError('')
    const maxBytes = maxSizeMB * 1024 * 1024
    const validFiles = []
    const restantes = maxFiles - files.length

    if (restantes <= 0) {
      setFileError(`Solo se permite un máximo de ${maxFiles} archivo${maxFiles !== 1 ? 's' : ''}.`)
      return
    }

    const entrantes = Array.from(fileList).slice(0, restantes)

    for (const file of entrantes) {
      if (file.size > maxBytes) {
        setFileError(`El archivo "${file.name}" supera el límite de ${maxSizeMB}MB.`)
        continue
      }

      if ((minWidth || minHeight) && file.type.startsWith('image/')) {
        try {
          const dimensions = await getImageDimensions(file)
          if (minWidth && dimensions.width < minWidth) {
            setFileError(`La imagen "${file.name}" tiene ${dimensions.width}px de ancho. Mínimo: ${minWidth}px.`)
            continue
          }
          if (minHeight && dimensions.height < minHeight) {
            setFileError(`La imagen "${file.name}" tiene ${dimensions.height}px de alto. Mínimo: ${minHeight}px.`)
            continue
          }
        } catch {
          setFileError(`No se pudo leer la imagen "${file.name}".`)
          continue
        }
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles])
    }
  }

  function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('No se pudo cargar la imagen'))
      }
      img.src = url
    })
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    addFiles(event.dataTransfer.files)
  }

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const completo = files.length >= maxFiles

  return (
    <div>
      {!completo && (
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary bg-warm-sand/30'
              : 'border-warm-sand hover:bg-warm-sand/15'
          }`}
        >
          <svg
            className="h-9 w-9 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 8.25 12 3.75 7.5 8.25M12 3.75v13.5"
            />
          </svg>
          <p className="font-sans text-sm text-cafe-noir">
            Arrastra archivos aquí o haz clic para seleccionarlos
          </p>
          <p className="font-sans text-xs text-secondary">
            {aceptarTexto(accept)} · máx. {maxSizeMB}MB por archivo{minWidth ? ` · mín. ${minWidth}×${minHeight}px` : ''}
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple={maxFiles > 1}
            accept={accept}
            className="hidden"
            onChange={(event) => addFiles(event.target.files)}
          />
        </div>
      )}

      {fileError && (
        <p className="mt-2 font-sans text-xs text-red-600">{fileError}</p>
      )}

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-warm-sand bg-white/40 p-3"
            >
              {previews[index] ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-warm-sand/30">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-sm font-medium text-cafe-noir">
                  {file.name}
                </p>
                <p className="font-sans text-xs text-secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="shrink-0 rounded-full bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropzone