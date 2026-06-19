$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()
Write-Host "========================================="
Write-Host "  Servidor corriendo en:"
Write-Host "  http://localhost:8000/"
Write-Host "========================================="
Write-Host "Presiona Ctrl+C para detener el servidor"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $url = $request.Url.LocalPath
    if ($url -eq '/') { $url = '/index.html' }

    $basePath = 'C:\Users\flopezs\Desktop\Pagina'
    $filePath = Join-Path $basePath ($url.TrimStart('/').Replace('/', '\'))

    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

        $mime = switch ($ext) {
            '.html'  { 'text/html; charset=utf-8' }
            '.css'   { 'text/css; charset=utf-8' }
            '.js'    { 'application/javascript; charset=utf-8' }
            '.json'  { 'application/json' }
            '.png'   { 'image/png' }
            '.jpg'   { 'image/jpeg' }
            '.jpeg'  { 'image/jpeg' }
            '.gif'   { 'image/gif' }
            '.svg'   { 'image/svg+xml' }
            '.ico'   { 'image/x-icon' }
            '.woff'  { 'font/woff' }
            '.woff2' { 'font/woff2' }
            '.ttf'   { 'font/ttf' }
            '.pdf'   { 'application/pdf' }
            default  { 'application/octet-stream' }
        }

        $response.ContentType = $mime
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "[200] $url"
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $url")
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "[404] $url"
    }

    $response.Close()
}
