# Usage: .\Generate.ps1 

$SpecName = "moonwalk"
# get the folder of the script
$ScriptFolder = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$SpecFolder = Join-Path -Path $ScriptFolder -ChildPath "..\specification"
$OutputFolder = Join-Path -Path $ScriptFolder -ChildPath "..\doc"

$HostFile = Join-Path -Path $SpecFolder -ChildPath ($SpecName + "-host.html")
$SourceFile = Join-Path -Path $SpecFolder -ChildPath ($SpecName + "-source.md")
$MergedFile = Join-Path -Path $SpecFolder -ChildPath ($SpecName + "-merged.html")
$OutputFile = Join-Path -Path $OutputFolder -ChildPath ($SpecName + ".html")

# Outer HTML template
$template = Get-Content $HostFile

# Core Markdown content
$content = Get-Content $SourceFile -raw

# Replace the content in the template
$template = $template -replace "<!-- CONTENT -->", $content
$template | Set-Content $MergedFile

# Do Respec processing on the merged file
& respec --src $MergedFile --out $OutputFile

Remove-Item $MergedFile
