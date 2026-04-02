package app

import "context"

var Bindings = []any{
	NewApp(),
}

type iStartup interface {
	startup(ctx context.Context)
}

func Startup(ctx context.Context) {
	for _, binding := range Bindings {
		if s, ok := binding.(iStartup); ok {
			s.startup(ctx)
		}
	}
}
