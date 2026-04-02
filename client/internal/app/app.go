package app

import (
	"context"
	"fmt"

	"github.com/MarlinKuhn/comp_chat/client/internal/config"
)

// App struct
type App struct {
	ctx    context.Context
	config config.Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	err := a.config.Load()
	if err != nil {
		panic(fmt.Sprintf("Failed to load config: %v", err))
	}
}

// Config returns the app's config
func (a *App) Config() config.Config {
	return a.config
}
