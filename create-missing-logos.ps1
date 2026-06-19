$marcasFaltantes = @(
    "Amsted Rail",
    "Creanza",
    "Donmez",
    "F.S.S.",
    "Gates",
    "Gedore",
    "Starrett",
    "ZEC"
)

$logoDir = "C:\Users\flopezs\Desktop\Pagina\logos"

Add-Type -AssemblyName System.Drawing

foreach ($marca in $marcasFaltantes) {
    $fileName = $marca -replace ' ', '-' -replace '[^a-zA-Z0-9\-]', ''
    $filePath = "$logoDir\$($fileName.ToLower()).png"

    # Check if file already exists and is a placeholder
    if (Test-Path $filePath) {
        $file = Get-Item $filePath
        if ($file.Length -lt 2000) {
            # Es un placeholder, reemplazarlo
            Remove-Item $filePath -Force
        } else {
            # Es un logo real, saltarlo
            continue
        }
    }

    try {
        $image = New-Object System.Drawing.Bitmap(200, 100)
        $graphics = [System.Drawing.Graphics]::FromImage($image)

        # Fondo gris oscuro
        $graphics.Clear([System.Drawing.Color]::FromArgb(200, 200, 200))

        # Borde
        $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(150, 150, 150), 2)
        $graphics.DrawRectangle($pen, 1, 1, 198, 98)

        # Texto
        $font = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Bold)
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(80, 80, 80))

        $format = New-Object System.Drawing.StringFormat
        $format.Alignment = [System.Drawing.StringAlignment]::Center
        $format.LineAlignment = [System.Drawing.StringAlignment]::Center

        $rect = New-Object System.Drawing.RectangleF(10, 10, 180, 80)
        $graphics.DrawString($marca, $font, $brush, $rect, $format)

        $graphics.Dispose()
        $image.Save($filePath)
        $image.Dispose()

        Write-Host "Creado: $marca"
    }
    catch {
        Write-Host "Error: $marca - $_"
    }
}

Write-Host "Completado"
