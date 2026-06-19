# Script para crear logos placeholders en escala de grises

$marcas = @(
    "Amsted Rail",
    "Creanza",
    "Donmez",
    "F.S.S.",
    "Gates",
    "Gedore",
    "Hose Solutions",
    "Kettenwulf",
    "Kit Masters",
    "Miner",
    "MWE",
    "Prestone",
    "Ramsey Products",
    "Reliable",
    "Spectroline",
    "Starrett",
    "Stemco",
    "Tuder Technica",
    "ZEC"
)

$logoDir = "C:\Users\flopezs\Desktop\Pagina\logos"
if (-not (Test-Path $logoDir)) {
    New-Item -ItemType Directory -Path $logoDir | Out-Null
}

Add-Type -AssemblyName System.Drawing

Write-Host "Creando logos en escala de grises..." -ForegroundColor Green

foreach ($marca in $marcas) {
    $fileName = $marca -replace ' ', '-' -replace '[^a-zA-Z0-9\-]', ''
    $filePath = "$logoDir\$($fileName.ToLower()).png"

    # Crear imagen 200x100 gris
    $image = New-Object System.Drawing.Bitmap(200, 100)
    $graphics = [System.Drawing.Graphics]::FromImage($image)

    # Fondo gris claro
    $graphics.Clear([System.Drawing.Color]::FromArgb(230, 230, 230))

    # Dibujar borde
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 180, 180), 1)
    $graphics.DrawRectangle($pen, 0, 0, 199, 99)

    # Texto del nombre
    $font = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 100, 100))

    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center

    $rect = New-Object System.Drawing.RectangleF(5, 5, 190, 90)
    $graphics.DrawString($marca, $font, $brush, $rect, $format)

    $graphics.Dispose()
    $image.Save($filePath)
    $image.Dispose()

    Write-Host "OK: $marca"
}

Write-Host "Logos creados: $($marcas.Count)"
