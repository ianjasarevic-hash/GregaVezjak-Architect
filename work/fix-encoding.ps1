$files = Get-ChildItem "C:\Users\ianja\Desktop\GVA_Project_Buraq_Web_Service-main\GVA_Project_Buraq_Web_Service-main\work\*.html"
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    # Replace various encoding artifacts
    $c = $c -replace "Paul`u2019s", "Paul's"
    $c = $c -replace "its`u2019s", "its'"
    $c = $c -replace "city`u2019s", "city's"
    $c = $c -replace "`u201C", '"'
    $c = $c -replace "`u201D", '"'
    $c = $c -replace "`u2026", "..."
    $c = $c -replace "`u2013", "-"
    Set-Content $f.FullName -Value $c -Encoding utf8
    Write-Host "Fixed: $($f.Name)"
}