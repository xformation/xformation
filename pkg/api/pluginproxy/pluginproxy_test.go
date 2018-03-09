package pluginproxy

import (
	"testing"

	"github.com/xformation/xformation/pkg/bus"
	m "github.com/xformation/xformation/pkg/models"
	"github.com/xformation/xformation/pkg/plugins"
	"github.com/xformation/xformation/pkg/setting"
	"github.com/xformation/xformation/pkg/util"
	. "github.com/smartystreets/goconvey/convey"
)

func TestPluginProxy(t *testing.T) {

	Convey("When getting proxy headers", t, func() {
		route := &plugins.AppPluginRoute{
			Headers: []plugins.AppPluginRouteHeader{
				{Name: "x-header", Content: "my secret {{.SecureJsonData.key}}"},
			},
		}

		setting.SecretKey = "password"

		bus.AddHandler("test", func(query *m.GetPluginSettingByIdQuery) error {
			key, err := util.Encrypt([]byte("123"), "password")
			if err != nil {
				return err
			}

			query.Result = &m.PluginSetting{
				SecureJsonData: map[string][]byte{
					"key": key,
				},
			}
			return nil
		})

		header, err := getHeaders(route, 1, "my-app")
		So(err, ShouldBeNil)

		Convey("Should render header template", func() {
			So(header.Get("x-header"), ShouldEqual, "my secret 123")
		})
	})

}
