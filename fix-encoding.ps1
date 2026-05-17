$workPath = "C:\Users\ianja\Desktop\GVA_Project_Buraq_Web_Service-main\GVA_Project_Buraq_Web_Service-main\work"

$files = @(
    "villa-bartolomei.html",
    "student-housing-nova-gorica.html",
    "local-comunity-cezsoca.html",
    "retirement-home-idrija.html",
    "canterbury-earthquake-memorial.html",
    "canterbury-earthquake-national-memorial-north-bank.html",
    "orehovlje-village-park.html",
    "house-bilje.html",
    "antonina-house.html",
    "little-garden-house.html",
    "kavcic-house.html"
)

function Replace-FileEncoding {
    param([string]$filePath)

    $content = Get-Content $filePath -Raw -Encoding UTF8

    # Fix common mojibake patterns - these are the UTF-8 double-encoded bytes seen in files
    $content = $content -replace "nadome[C4][A1]eni", "nadomesten"
    $content = $content -replace "nadome[C5][BD]eni", "nadomesten"
    $content = $content -replace "ve[C4][A1]namensko", "vecnamensko"
    $content = $content -replace "ve[C5][BD]namensko", "vecnamensko"
    $content = $content -replace "Goriskega", "Goriske[0xC4][0xA1]ga"
    $content = $content -replace "pomozni", "pomo[0xC5][0xBD]ni"
    $content = $content -replace "knjiznico", "knji[0xC5][0xBD]nico"
    $content = $content -replace "garazo", "gara[0xC5][0xBD]o"

    # Direct string replacements - the exact mojibake patterns
    $content = $content -replace "nado`u008D`me[C4][A1]eni", "nadomesten"
    $content = $content -replace "nado`u008D`mešeni", "nadomesten"
    $content = $content -replace "nadomešeni", "nadomesten"
    $content = $content -replace "nadomes`u008D`eni", "nadomesten"
    $content = $content -replace "ve`u008D`namensko", "vecnamensko"

    $content | Set-Content $filePath -Encoding UTF8 -NoNewline
}

foreach ($f in $files) {
    $filePath = Join-Path $workPath $f
    if (Test-Path $filePath) {
        Write-Host "Processing $f..."

        $content = Get-Content $filePath -Raw -Encoding UTF8
        $orig = $content

        # Replace patterns - using .NET regex
        $content = $content -replace [char]0xC4 + [char]0xA1 + "eni", [char]0xE4 + [char]0x8D + [char]0xA1 + "ni"
        $content = $content -replace [char]0xC5 + [char]0xBD + "eni", [char]0xE4 + [char]0x8D + [char]0xA1 + "ni"

        $content | Set-Content $filePath -Encoding UTF8 -NoNewline
        Write-Host "Done $f"
    }
}
Write-Host "All done!"