const BASE = "/api/v1";

export const API = {
    auth: {
        signup: `${BASE}/user/signup`,
        signin: `${BASE}/user/signin`,
        logout: `${BASE}/user/logout`,
        me: `${BASE}/user/me`,
    },
    content: {
        get: `${BASE}/content/get-content`,
        create: `${BASE}/content/create-content`,
        delete: (id: string) => `${BASE}/content/delete-content/${id}`,  // was missing /
        update: (id: string) => `${BASE}/content/update-content/${id}`,  // was missing /
        share: `${BASE}/content/brain/share`,
        shared: (shareLink: string) => `${BASE}/content/brain/${shareLink}`,
    }
};