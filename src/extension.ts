import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Activating Call of the Desert extension");

  let disposable = vscode.commands.registerCommand(
    "call-of-the-desert.toggleTheme",
    () => {
      console.log("Toggle theme command triggered");
      const config = vscode.workspace.getConfiguration();
      const currentTheme = config.get("workbench.colorTheme");
      console.log("Current theme:", currentTheme);

      try {
        if (currentTheme === "Desert Day") {
          config.update("workbench.colorTheme", "Desert Night", true);
          console.log("Switched to Desert Night");
        } else {
          config.update("workbench.colorTheme", "Desert Day", true);
          console.log("Switched to Desert Day");
        }
      } catch (error) {
        console.error("Error toggling theme:", error);
        vscode.window.showErrorMessage(`Failed to toggle theme: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);

  // Create a status bar item
  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.text = "$(color-mode) Desert Theme";
  statusBarItem.command = "call-of-the-desert.toggleTheme";
  statusBarItem.show();

  context.subscriptions.push(statusBarItem);

  // Add a command to list available themes
  let listThemes = vscode.commands.registerCommand(
    "call-of-the-desert.listThemes",
    () => {
      const themes = vscode.extensions.all
        .filter(
          (extension) =>
            extension.packageJSON.contributes &&
            extension.packageJSON.contributes.themes
        )
        .flatMap((extension) =>
          extension.packageJSON.contributes.themes.map(
            (theme: any) => theme.label
          )
        );

      console.log("Available themes:", themes);
      vscode.window.showInformationMessage(
        `Available themes: ${themes.join(", ")}`
      );
    }
  );

  context.subscriptions.push(listThemes);

  console.log("Call of the Desert extension activated");
}

export function deactivate() {
  console.log("Call of the Desert extension deactivated");
}
