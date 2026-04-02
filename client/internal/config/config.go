package config

type Config struct {
	Servers []Server `json:"servers"`
}

func (cfg *Config) Load() error {
	return GetJSON("config.json", cfg)
}

func (cfg Config) Save() error {
	return GetJSON("config.json", cfg)
}

type Server struct {
	IP       string `json:"ip"`
	UserName string `json:"userName"`
}
