package sqlstore

import (
	"github.com/xformation/xformation/pkg/bus"
	m "github.com/xformation/xformation/pkg/models"
)

func init() {
	bus.AddHandler("sql", GetDBHealthQuery)
}

func GetDBHealthQuery(query *m.GetDBHealthQuery) error {
	return x.Ping()
}
