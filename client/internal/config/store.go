package config

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

var userConfigDir = os.UserConfigDir

const appName = "NanoWave"

// SaveJSON writes the provided value as indented JSON in the OS default
// config directory for the application.
func SaveJSON(fileName string, value any) error {
	if strings.TrimSpace(fileName) == "" {
		return errors.New("file name is required")
	}
	if filepath.Base(fileName) != fileName {
		return fmt.Errorf("file name must not contain path separators: %q", fileName)
	}

	configDir, err := userConfigDir()
	if err != nil {
		return fmt.Errorf("resolve user config dir: %w", err)
	}

	appDir := filepath.Join(configDir, appName)
	if err := os.MkdirAll(appDir, 0o700); err != nil {
		return fmt.Errorf("create config directory: %w", err)
	}

	payload, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal config json: %w", err)
	}

	path := filepath.Join(appDir, fileName)
	if err := os.WriteFile(path, append(payload, '\n'), 0o600); err != nil {
		return fmt.Errorf("write config file: %w", err)
	}

	return nil
}

func GetJSON(fileName string, v any) error {
	if strings.TrimSpace(fileName) == "" {
		return errors.New("file name is required")
	}
	if filepath.Base(fileName) != fileName {
		return fmt.Errorf("file name must not contain path separators: %q", fileName)
	}
	configDir, err := userConfigDir()
	if err != nil {
		return fmt.Errorf("resolve user config dir: %w", err)
	}

	appDir := filepath.Join(configDir, appName)
	if err := os.MkdirAll(appDir, 0o700); err != nil {
		return fmt.Errorf("create config directory: %w", err)
	}

	path := filepath.Join(appDir, fileName)
	data, err := os.ReadFile(path)
	if err != nil {
		// check if exists
		if errors.Is(err, os.ErrNotExist) {
			return nil
		}

		return fmt.Errorf("read config file: %w", err)
	}

	if err := json.Unmarshal(data, v); err != nil {
		return fmt.Errorf("unmarshal config json: %w", err)
	}

	return nil
}
