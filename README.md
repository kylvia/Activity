---
title: Activity - 离屏缓存
order: 0
atomId: Activity
---

# Activity - 离屏缓存

在视觉上隐藏 UI，但将其内容降低优先级。这个想法本质上类似于 content-visibility CSS 属性：当内容被隐藏时，它不需要与其他 UI 保持同步。React 可以将渲染工作推迟到应用程序的其他部分处于空闲状态，或者直到内容再次变得可见为止。

## 何时使用

路由前进时加载对应路由最新的页面，路由后退时展示对应路由页面上一次离开时的状态，点击菜单总是加载最新的页面。

## 使用

在全局 layout 的 Outlet 处用 OffScreenContext.Provider 包裹并传入必要的路由信息

```tsx | pure

import {
  KeepAliveOutlet,
  OffScreenContext,
  useActivity,
} from '@tz/components/Activity';

...
  const location = useLocation();
  const outlet = useOutlet();
  const res = useActivity({ action: history.action, location, outlet });
...
    <OffScreenContext.Provider value={{ ...res }}>
        <KeepAliveOutlet />
    </OffScreenContext.Provider>

```

## 模态窗或渲染在 root 节点外的组件处使用

在模态窗的根下用指定 ref 的 dom，并调用注册函数 registryCompScroll 将 ref 传入：

```tsx | pure
import { OffScreenContext } from '@tz/components/Activity';
...
const ref = useRef<HTMLDivElement>(null);

    const { registryCompScroll } = useContext(OffScreenContext);
    useEffect(() => {
    setTimeout(() => {
        registryCompScroll(ref.current);
    }, 500);
    }, []);
    <Drawer
        width={1152}
        destroyOnClose
        open={open}
        onClose={onClose}
        title={name}
        className="plugins-drawer"
        styles={{ body: { padding: 0 } }}
    >
    <div ref={ref}></div>
    ...
    </Drawer>
    ...
```

## API

Activity 在 react 的 Suspense 上，结合 react-router 进行了一层封装。必要的 API 如下：

| 属性     | 描述                                                | 类型                           | 默认值 |
| -------- | --------------------------------------------------- | ------------------------------ | ------ |
| action   | 浏览器 history 的当前操作 (PUSH, REPLACE, or POP)   | `string`                       | -      |
| location | 当前位置信息                                        | `{pathname: string;key: Key;}` | -      |
| outlet   | 当前路由 outlet，对应 `react-router` 的 useOutlet() | `React.ReactElement \| null`   | -      |
