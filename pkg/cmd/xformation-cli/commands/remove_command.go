package commands

import (
	"errors"
	"fmt"
	m "github.com/xformation/xformation/pkg/cmd/xformation-cli/models"
	services "github.com/xformation/xformation/pkg/cmd/xformation-cli/services"
	"strings"
)

var getPluginss func(path string) []m.InstalledPlugin = services.GetLocalPlugins
var removePlugin func(pluginPath, id string) error = services.RemoveInstalledPlugin

func removeCommand(c CommandLine) error {
	pluginPath := c.PluginDirectory()

	plugin := c.Args().First()
	if plugin == "" {
		return errors.New("Missing plugin parameter")
	}

	err := removePlugin(pluginPath, plugin)

	if err != nil {
		if strings.Contains(err.Error(), "no such file or directory") {
			return fmt.Errorf("Plugin does not exist")
		}

		return err
	}

	return nil
}
