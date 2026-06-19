# Script para descargar logos de marcas Quinteros

$logos = @(
    @{name = "amsted-rail"; url = "https://www.amsted.com/app/uploads/2020/06/Amsted_Mark_Horizontal.png"},
    @{name = "gates"; url = "https://www.gates.com/-/media/project/gates/images/logo_static.png"},
    @{name = "gedore"; url = "https://www.gedore.com/media/images/logo-gedore-red.svg"},
    @{name = "prestone"; url = "https://www.prestoneonline.com/images/prestone-logo.png"},
    @{name = "starrett"; url = "https://www.starrett.com/images/logo-ls-starrett.png"},
    @{name = "stemco"; url = "https://www.stemco.com/themes/custom/stemco/logo.svg"}
)

$logoDir = "C:\Users\flopezs\Desktop\Pagina\logos"
if (-not (Test-Path $logoDir)) {
    New-Item -ItemType Directory -Path $logoDir | Out-Null
}

Write-Host "Descargando logos..." -ForegroundColor Green

foreach ($logo in $logos) {
    try {
        $outputPath = "$logoDir\$($logo.name).png"
        Write-Host "Descargando: $($logo.name)..." -ForegroundColor Cyan

        # Descargar el archivo
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($logo.url, $outputPath)

        Write-Host "✓ Descargado: $($logo.name)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error descargando $($logo.name): $_" -ForegroundColor Red
    }
}

Write-Host "`nConvirtiendo a escala de grises y redimensionando..." -ForegroundColor Green

# Cargar assembly de System.Drawing
Add-Type -AssemblyName System.Drawing

Get-ChildItem $logoDir -Filter "*.png" | ForEach-Object {
    try {
        $imagePath = $_.FullName
        $image = [System.Drawing.Image]::FromFile($imagePath)

        # Crear bitmap en escala de grises
        $grayImage = New-Object System.Drawing.Bitmap($image.Width, $image.Height)

        for ($y = 0; $y -lt $image.Height; $y++) {
            for ($x = 0; $x -lt $image.Width; $x++) {
                $pixel = $image.GetPixel($x, $y)
                $gray = [Math]::Round(0.299 * $pixel.R + 0.587 * $pixel.G + 0.114 * $pixel.B)
                $newPixel = [System.Drawing.Color]::FromArgb($pixel.A, $gray, $gray, $gray)
                $grayImage.SetPixel($x, $y, $newPixel)
            }
        }

        # Redimensionar a 200x100
        $targetSize = New-Object System.Drawing.Size(200, 100)
        $resizedImage = New-Object System.Drawing.Bitmap(200, 100)
        $graphics = [System.Drawing.Graphics]::FromImage($resizedImage)
        $graphics.DrawImage($image, 0, 0, 200, 100)
        $graphics.Dispose()

        # Guardar imagen procesada
        $resizedImage.Save($imagePath)
        $resizedImage.Dispose()
        $grayImage.Dispose()
        $image.Dispose()

        Write-Host "✓ Procesado: $($_.Name)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error procesando $($_.Name): $_" -ForegroundColor Red
    }
}

Write-Host "`nProceso completado." -ForegroundColor Green
