import { useEffect, useRef } from "react";

export const useWhyDidYouUpdate = (componentName, props) => {
  const prevProps = useRef({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}

export const observerPerformance = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (const entry of entries) {
    // 过滤静态资源类型
    if (["img", "script", "css", "link"].includes(entry.initiatorType)) {
      console.log(`资源 ${entry.name} 类型 ${entry.initiatorType} 耗时：${entry.duration.toFixed(2)} 毫秒`);
    }
  }
});

export const perfObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === "first-contentful-paint") {
      console.log("FCP:", entry.startTime);
    } else if (entry.name === "largest-contentful-paint") {
      console.log("LCP:", entry.startTime);
    }
  }
});
