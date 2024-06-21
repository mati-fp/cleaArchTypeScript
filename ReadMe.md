# Troubleshooting: Node Modules not Visible in VS Code

If you have recently started a container and find that VS Code is unable to detect the downloaded modules in the `node_modules` folder, you can try enabling the "Enable Prompt Use Workspace Tsdk" option in the VS Code settings.

To do this, follow the steps below:

1. Open VS Code and navigate to the settings by clicking on the gear icon in the lower-left corner of the window.

2. In the settings menu, search for "Enable Prompt Use Workspace Tsdk" and click on the checkbox to enable it.

3. Save the changes and restart VS Code.

After enabling this option, VS Code should be able to detect the modules in the `node_modules` folder and provide IntelliSense and other language services accordingly.

Please note that this option is specific to the workspace and needs to be enabled for each workspace individually.

If you continue to experience issues, make sure that the container is properly configured and the `node_modules` folder is present in the correct location.
