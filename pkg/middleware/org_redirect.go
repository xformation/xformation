package middleware

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/xformation/xformation/pkg/bus"
	"github.com/xformation/xformation/pkg/models"
	"github.com/xformation/xformation/pkg/setting"

	"gopkg.in/macaron.v1"
)

func OrgRedirect() macaron.Handler {
	return func(res http.ResponseWriter, req *http.Request, c *macaron.Context) {
		orgIdValue := req.URL.Query().Get("orgId")
		orgId, err := strconv.ParseInt(orgIdValue, 10, 32)

		if err != nil || orgId == 0 {
			return
		}

		ctx, ok := c.Data["ctx"].(*Context)
		if !ok || !ctx.IsSignedIn {
			return
		}

		if orgId == ctx.OrgId {
			return
		}

		cmd := models.SetUsingOrgCommand{UserId: ctx.UserId, OrgId: orgId}
		if err := bus.Dispatch(&cmd); err != nil {
			if ctx.IsApiRequest() {
				ctx.JsonApiErr(404, "Not found", nil)
			} else {
				ctx.Error(404, "Not found")
			}

			return
		}

		newURL := setting.ToAbsUrl(fmt.Sprintf("%s?%s", strings.TrimPrefix(c.Req.URL.Path, "/"), c.Req.URL.Query().Encode()))
		c.Redirect(newURL, 302)
	}
}
