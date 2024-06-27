[Setup]
AppName=MyScreensaver
AppVersion=1.0
DefaultDirName={localappdata}\MyScreensaver
DefaultGroupName=MyScreensaver
OutputDir=.
OutputBaseFilename=MyScreensaverInstaller
PrivilegesRequired=lowest

[Files]
Source: "C:\Users\Dell\source\repos\MyScreenSaver\MyScreenSaver\bin\Debug\screensaver\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs
Source: "SetScreensaver.bat"; DestDir: "{app}"; Flags: ignoreversion

[Run]
Filename: "{app}\SetScreensaver.bat"; Flags: runhidden


[Registry]
Root: "HKCU"; Subkey: "Software\Microsoft\Windows\CurrentVersion\Run"; ValueType: string; ValueName: "MsgHL"; ValueData: """{app}\dist\win-unpacked\companynotificationapp.exe"""; Flags: uninsdeletevalue
