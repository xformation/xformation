package plugins

import (
	"testing"

	"github.com/xformation/xformation/pkg/setting"
	. "github.com/smartystreets/goconvey/convey"
)

func TestFrontendPlugin(t *testing.T) {

	Convey("When setting paths based on App on Windows", t, func() {
		setting.StaticRootPath = "c:\\xformation\\public"

		fp := &FrontendPluginBase{
			PluginBase: PluginBase{
				PluginDir: "c:\\xformation\\public\\app\\plugins\\app\\testdata\\datasources\\datasource",
				BaseUrl:   "fpbase",
			},
		}
		app := &AppPlugin{
			FrontendPluginBase: FrontendPluginBase{
				PluginBase: PluginBase{
					PluginDir: "c:\\xformation\\public\\app\\plugins\\app\\testdata",
					Id:        "testdata",
					BaseUrl:   "public/app/plugins/app/testdata",
				},
			},
		}
		fp.setPathsBasedOnApp(app)

		So(fp.Module, ShouldEqual, "app/plugins/app/testdata/datasources/datasource/module")
	})
}
