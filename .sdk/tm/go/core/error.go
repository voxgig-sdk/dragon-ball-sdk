package core

type DragonBallError struct {
	IsDragonBallError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDragonBallError(code string, msg string, ctx *Context) *DragonBallError {
	return &DragonBallError{
		IsDragonBallError: true,
		Sdk:              "DragonBall",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DragonBallError) Error() string {
	return e.Msg
}
