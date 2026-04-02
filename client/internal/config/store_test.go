package config

import (
	"path/filepath"
	"reflect"
	"testing"
)

func TestSaveJSONWritesConfigFile(t *testing.T) {
	tempDir := t.TempDir()

	previous := userConfigDir
	userConfigDir = func() (string, error) {
		return tempDir, nil
	}
	t.Cleanup(func() {
		userConfigDir = previous
	})

	type sampleConfig struct {
		Server string `json:"server"`
		Muted  bool   `json:"muted"`
	}

	in := sampleConfig{
		Server: "voice.example.test",
		Muted:  true,
	}
	err := SaveJSON("settings.json", in)
	if err != nil {
		t.Fatalf("SaveJSON returned error: %v", err)
	}

	var out sampleConfig
	err = GetJSON("settings.json", &out)
	if err != nil {
		t.Fatalf("GetJSON returned error: %v", err)
	}

	if !reflect.DeepEqual(in, out) {
		t.Fatalf("config file miss match")
	}
}

func TestSaveJSONRejectsInvalidArguments(t *testing.T) {
	tests := []struct {
		name     string
		fileName string
	}{
		{name: "missing file"},
		{name: "nested file path", fileName: filepath.Join("nested", "settings.json")},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if err := SaveJSON(test.fileName, map[string]string{"ok": "true"}); err == nil {
				t.Fatal("SaveJSON should reject invalid arguments")
			}
		})
	}
}
