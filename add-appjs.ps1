$files = Get-ChildItem "C:\Users\ianja\Desktop\GVA_Project_Buraq_Web_Service-main\GVA_Project_Buraq_Web_Service-main\work\*.html"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -notmatch "app\.js") {
        $newContent = $content -replace '(<script src="../asset/js/i18n.js"></script>)', '$1\r\n    <script src="../asset/js/app.js"></script>'
        Set-Content -Path $f.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($f.Name)"
    }
}
Write-Host "Done!"