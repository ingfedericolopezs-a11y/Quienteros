$port = 8000
$folder = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Servidor iniciado en: http://localhost:$port"
Write-Host "Presiona Ctrl+C para detener el servidor"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $requestPath = $request.Url.LocalPath
        if ($requestPath -eq "/") { $requestPath = "/index.html" }

        $filePath = Join-Path $folder $requestPath.TrimStart("/")

        if (Test-Path $filePath -PathType Leaf) {
            $fileContent = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $fileContent.Length

            # Set content type based on file extension
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css; charset=utf-8" }
                ".js" { $response.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".png" { $response.ContentType = "image/png" }
                ".jpg" { $response.ContentType = "image/jpeg" }
                ".gif" { $response.ContentType = "image/gif" }
                ".svg" { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.OutputStream.Write($fileContent, 0, $fileContent.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/html"
            $errorMessage = "404 - Archivo no encontrado: $requestPath"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorMessage)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.OutputStream.Close()
        Write-Host "$($request.HttpMethod) $($request.Url.LocalPath) - $($response.StatusCode)"
    } catch {
        Write-Error "Error: $_"
    }
}

$listener.Stop()
$listener.Close()
