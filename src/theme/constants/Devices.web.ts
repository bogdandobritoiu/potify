// const userAgent = global?.navigator?.userAgent

// export const isWindows = false
export const isWindows = !!global?.navigator?.userAgent.match(/Win/i)
// export const isMac = false
export const isMac = !!global?.navigator?.userAgent.match(/Mac/i)
// export const isLinux = false
export const isLinux = !!global?.navigator?.userAgent.match(/Linux/i)

export const isDesktop = isWindows || isMac || isLinux
