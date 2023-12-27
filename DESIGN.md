```mermaid
graph LR

Root --- Control
Root --- ControlContainer
Root --- ControlWrapper
Root --- Component
Root --- ComponentContainer
Root --- ComponentWrapper

Control --- SingleKeyControl --- AnyKeyControl
Control --- MultiKeyControl --- AnyKeyControl

AnyKeyControl --- NormalControl
AnyKeyControl --- ComposableControl

NormalControl --- Toggle
NormalControl --- Slider
NormalControl --- ...

ComposableControl --- Input
ComposableControl --- Number
ComposableControl --- ....

ControlContainer --- FormGroup
ControlContainer --- FormArray

ControlWrapper --- InputGroup

Component --- Button
Component --- Text
Component --- .....

ComponentContainer --- Tabs
ComponentContainer --- Steps

ComponentWrapper --- ButtonGroup
```

<br>

#### Wrapper 与 Container 的区别：
Wrapper 只能包含一层子图示，而 Container 可以包含多层子图示
