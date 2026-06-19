$sourceDir = "C:\Users\flopezs\Desktop\Pagina\Logos\Logos correctos"
$targetDir = "C:\Users\flopezs\Desktop\Pagina\logos"

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

Add-Type -AssemblyName System.Drawing

Get-ChildItem $sourceDir -Include *.jpg, *.jpeg, *.png, *.bmp | ForEach-Object {
    $sourcePath = $_.FullName
    $fileName = $_.BaseName
    $targetPath = "$targetDir\$fileName.png"

    try {
        $image = [System.Drawing.Image]::FromFile($sourcePath)

        # Create grayscale bitmap
        $grayBitmap = New-Object System.Drawing.Bitmap($image.Width, $image.Height)

        for ($y = 0; $y -lt $image.Height; $y++) {
            for ($x = 0; $x -lt $image.Width; $x++) {
                $pixel = $image.GetPixel($x, $y)
                $gray = [Math]::Round(0.299 * $pixel.R + 0.587 * $pixel.G + 0.114 * $pixel.B)
                $grayPixel = [System.Drawing.Color]::FromArgb($pixel.A, $gray, $gray, $gray)
                $grayBitmap.SetPixel($x, $y, $grayPixel)
            }
        }

        # Resize to 200x100
        $resized = New-Object System.Drawing.Bitmap(200, 100)
        $graphics = [System.Drawing.Graphics]::FromImage($resized)
        $graphics.DrawImage($grayBitmap, 0, 0, 200, 100)
        $graphics.Dispose()

        $resized.Save($targetPath)
        $resized.Dispose()
        $grayBitmap.Dispose()
        $image.Dispose()

        Write-Host "OK: $fileName"
    }
    catch {
        Write-Host "ERROR: $fileName - $_"
    }
}

Write-Host "Procesamiento completado"
