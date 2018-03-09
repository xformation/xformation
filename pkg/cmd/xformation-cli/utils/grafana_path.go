package utils

import (
	"os"

	"github.com/xformation/xformation/pkg/cmd/xformation-cli/logger"
)

func GetGrafanaPluginDir(currentOS string) string {
	//currentOS := runtime.GOOS

	if currentOS == "windows" {
		return returnOsDefault(currentOS)
	}

	pwd, err := os.Getwd()

	if err != nil {
		logger.Error("Could not get current path. using default")
		return returnOsDefault(currentOS)
	}

	if isDevenvironment(pwd) {
		return "../data/plugins"
	}

	return returnOsDefault(currentOS)
}

func isDevenvironment(pwd string) bool {
	// if ../conf/defaults.ini exists, xformation is not installed as package
	// that its in development environment.
	_, err := os.Stat("../conf/defaults.ini")
	return err == nil
}

func returnOsDefault(currentOs string) string {
	switch currentOs {
	case "windows":
		return "../data/plugins"
	case "darwin":
		return "/usr/local/var/lib/xformation/plugins"
	case "freebsd":
		return "/var/db/xformation/plugins"
	default: //"linux"
		return "/var/lib/xformation/plugins"
	}
}
