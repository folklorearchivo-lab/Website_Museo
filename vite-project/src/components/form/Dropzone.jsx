import { useRef, useState } from 'react'

function aceptarTexto(accept) {
  const mimeMap = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WEBP',
    'application/pdf': 'PDF',
  }
  return accept.split(',').map(t => mimeMap[t.trim()] || t.trim()).join(', ')
}

function Dropzone({ files, onFilesChange, maxSizeMB = 5, accept = 'image/jpeg,image/png,image/webp,application/pdf', minWidth, minHeight }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileError, setFileError] = useState('')
  const inputRef = useRef(null)

  const addFiles = async (fileList) => {
    setFileError('')
    const maxBytes = maxSizeMB * 1024 * 1024
    const validFiles = []

    for (const file of Array.from(fileList)) {
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

  return (
    <div>
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
          multiple
          accept={accept}
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>

      {fileError && (
        <p className="mt-2 font-sans text-xs text-red-600">{fileError}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between border-b border-warm-sand px-1 py-2 font-sans text-sm text-cafe-noir"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-tertiary hover:underline text-xs font-medium"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropzone
