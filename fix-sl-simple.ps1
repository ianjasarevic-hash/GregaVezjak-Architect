# Fix encoding for Slovenian text in HTML files
# Run this script from PowerShell

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

foreach ($f in $files) {
    $filePath = Join-Path $workPath $f
    if (Test-Path $filePath) {
        Write-Host "Processing $f..."

        $text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

        # Apply fixes
        $text = $text -replace "nadome[N]eni", "nadomesten" -replace "[N]", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "ve[N]namensko", "vecnamensko" -replace "N", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "Goriskega", "Gori[C]kega" -replace "C", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "pomozni", "pomo[Z]ni" -replace "Z", ([char]0xC5 + [char]0xBD)
        $text = $text -replace "knjiznico", "knji[Z]nico" -replace "Z", ([char]0xC5 + [char]0xBD)
        $text = $text -replace "garazo", "gara[Z]o" -replace "Z", ([char]0xC5 + [char]0xBD)
        $text = $text -replace "Resitev", "Re[S]itev" -replace "S", ([char]0xC5 + [char]0xA1)
        $text = $text -replace "Nateajni", "Nate[C]ajni" -replace "C", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "zraenje", "zra[C]enje" -replace "C", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "uinkovitost", "u[C]inkovitost" -replace "C", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "izhodia", "izhodi[S]a" -replace "S", ([char]0xC5 + [char]0xA1)
        $text = $text -replace "stopnie", "stopni[S]e" -replace "S", ([char]0xC5 + [char]0xA1)
        $text = $text -replace "omogoi", "omogo[C]i" -replace "C", ([char]0xC4 + [char]0xA1)
        $text = $text -replace "zaitene", "za[S]itene" -replace "S", ([char]0xC5 + [char]0xA1)
        $text = $text -replace "sonen park", "son[C]en park" -replace "C", ([char]0xC4 + [char]0xA1)

        [System.IO.File]::WriteAllText($filePath, $text, [System.Text.Encoding]::UTF8)
        Write-Host "Done $f"
    }
}
Write-Host "All files processed!"