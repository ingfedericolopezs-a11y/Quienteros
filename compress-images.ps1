Add-Type -AssemblyName System.Drawing

# Crear carpeta optimized
if (-not (Test-Path "C:\Users\flopezs\Desktop\Pagina\optimized")) {
    New-Item -ItemType Directory -Path "C:\Users\flopezs\Desktop\Pagina\optimized" | Out-Null
}

# Imagenes que se usan en la pagina
$images = @(
    "shutterstock_230489932.jpg",
    "shutterstock_188389784.jpg",
    "shutterstock_141409537.jpg",
    "shutterstock_260598251.jpg",
    "shutterstock_134184635.jpg",
    "shutterstock_115685029.jpg",
    "shutterstock_113089669.jpg",
    "shutterstock_96365069.jpg"
)

Write-Host "Comprimiendo imagenes..."

foreach ($img in $images) {
    $source = "C:\Users\flopezs\Desktop\Pagina\originales shutterstock\$img"
    $dest = "C:\Users\flopezs\Desktop\Pagina\optimized\$img"

    if (Test-Path $source) {
        try {
            [System.Drawing.Image]$image = [System.Drawing.Image]::FromFile($source)

            # Calcular nuevas dimensiones
            $width = $image.Width
            $height = $image.Height

            if ($width -gt 1920) {
                $ratio = $height / $width
                $width = 1920
                $height = [int]($width * $ratio)
            }

            # Crear bitmap redimensionado
            $bitmap = New-Object System.Drawing.Bitmap($width, $height)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            $graphics.DrawImage($image, 0, 0, $width, $height)

            # Guardar con compresion
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 70)

            $bitmap.Save($dest, $encoder, $encParams)

            $image.Dispose()
            $graphics.Dispose()
            $bitmap.Dispose()

            $origSize = [math]::Round((Get-Item $source).Length / 1MB, 2)
            $newSize = [math]::Round((Get-Item $dest).Length / 1MB, 2)
            Write-Host "OK - $img : ${origSize}MB -> ${newSize}MB"
        } catch {
            Write-Host "ERROR - $img : $_"
        }
    }
}

Write-Host "Listo!"
