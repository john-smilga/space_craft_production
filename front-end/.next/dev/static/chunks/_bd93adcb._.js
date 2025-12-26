(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramStore",
    ()=>usePlanogramStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$zustand$2f$create$2d$selectors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/zustand/create-selectors.ts [app-client] (ecmascript)");
;
;
;
const usePlanogramStoreBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((set)=>({
        // Form state
        name: '',
        isEditingName: false,
        selectedDisplay: '',
        season: 'summer',
        shelfCount: 1,
        widthIn: 0,
        heightIn: 0,
        selectedCategoryIds: [],
        // Layout state
        gridData: null,
        rowLayouts: {},
        loading: true,
        skipNextInitialization: false,
        // UI state
        rowNotifications: {},
        // Available Products state
        availableItems: [],
        loadingAvailableItems: false,
        selectedAvailableItems: new Map(),
        targetRowId: null,
        // Sidebar state
        sidebarOpen: false,
        sidebarExpanded: false,
        availableProductsSidebarOpen: false,
        availableProductsSidebarExpanded: false,
        // Download state
        downloadLoading: false,
        // AI state
        aiDialogOpen: false,
        aiLoading: false,
        aiError: null,
        aiOverview: null,
        // Form actions
        setName: (name)=>set({
                name
            }, false, 'planogram/setName'),
        setIsEditingName: (isEditing)=>set({
                isEditingName: isEditing
            }, false, 'planogram/setIsEditingName'),
        setSelectedDisplay: (display)=>set({
                selectedDisplay: display
            }, false, 'planogram/setSelectedDisplay'),
        setSeason: (season)=>set({
                season
            }, false, 'planogram/setSeason'),
        setShelfCount: (count)=>set({
                shelfCount: count
            }, false, 'planogram/setShelfCount'),
        setWidthIn: (width)=>set({
                widthIn: width
            }, false, 'planogram/setWidthIn'),
        setHeightIn: (height)=>set({
                heightIn: height
            }, false, 'planogram/setHeightIn'),
        setSelectedCategoryIds: (ids)=>set({
                selectedCategoryIds: ids
            }, false, 'planogram/setSelectedCategoryIds'),
        toggleCategory: (categoryId)=>set((state)=>({
                    selectedCategoryIds: state.selectedCategoryIds.includes(categoryId) ? state.selectedCategoryIds.filter((id)=>id !== categoryId) : [
                        ...state.selectedCategoryIds,
                        categoryId
                    ]
                }), false, 'planogram/toggleCategory'),
        initializeForm: (data)=>set((state)=>({
                    name: data.name !== undefined ? data.name : state.name,
                    selectedDisplay: data.display_id || state.selectedDisplay,
                    season: data.season || state.season,
                    shelfCount: data.shelf_count && data.shelf_count > 0 ? data.shelf_count : state.shelfCount || 1,
                    widthIn: data.width_in || state.widthIn,
                    heightIn: data.height_in || state.heightIn,
                    selectedCategoryIds: data.category_ids || state.selectedCategoryIds
                }), false, 'planogram/initializeForm'),
        resetForm: ()=>set({
                name: '',
                isEditingName: false,
                selectedDisplay: '',
                season: 'summer',
                shelfCount: 1,
                widthIn: 0,
                heightIn: 0,
                selectedCategoryIds: []
            }, false, 'planogram/resetForm'),
        // Layout actions
        setGridData: (data)=>set({
                gridData: data
            }, false, 'planogram/setGridData'),
        setRowLayouts: (layouts)=>set({
                rowLayouts: layouts
            }, false, 'planogram/setRowLayouts'),
        updateRowLayout: (rowId, items)=>set((state)=>({
                    rowLayouts: {
                        ...state.rowLayouts,
                        [rowId]: items
                    }
                }), false, 'planogram/updateRowLayout'),
        setLoading: (loading)=>set({
                loading
            }, false, 'planogram/setLoading'),
        setSkipNextInitialization: (skip)=>set({
                skipNextInitialization: skip
            }, false, 'planogram/setSkipNextInitialization'),
        initializeLayouts: (layout)=>set((state)=>{
                if (state.skipNextInitialization) {
                    return {
                        skipNextInitialization: false
                    };
                }
                const layouts = {};
                layout.rows.forEach((row)=>{
                    layouts[row.id] = row.items.map((item)=>({
                            ...item,
                            meta: item.meta || {
                                id: parseInt(item.i),
                                name: 'Unknown',
                                category: '',
                                score: 0,
                                pack_width_in: 0,
                                pack_height_in: 0
                            }
                        }));
                });
                return {
                    gridData: layout,
                    rowLayouts: layouts,
                    loading: false
                };
            }, false, 'planogram/initializeLayouts'),
        // UI actions
        setRowNotification: (rowId, message)=>set((state)=>{
                const notifications = {
                    ...state.rowNotifications
                };
                if (message === null) {
                    delete notifications[rowId];
                } else {
                    notifications[rowId] = message;
                }
                return {
                    rowNotifications: notifications
                };
            }, false, 'planogram/setRowNotification'),
        clearRowNotifications: ()=>set({
                rowNotifications: {}
            }, false, 'planogram/clearRowNotifications'),
        // Available Products actions
        setAvailableItems: (items)=>set({
                availableItems: items
            }, false, 'planogram/setAvailableItems'),
        setLoadingAvailableItems: (loading)=>set({
                loadingAvailableItems: loading
            }, false, 'planogram/setLoadingAvailableItems'),
        incrementItemQuantity: (itemId)=>set((state)=>{
                const newMap = new Map(state.selectedAvailableItems);
                const currentQty = newMap.get(itemId) || 0;
                newMap.set(itemId, currentQty + 1);
                return {
                    selectedAvailableItems: newMap
                };
            }, false, 'planogram/incrementItemQuantity'),
        decrementItemQuantity: (itemId)=>set((state)=>{
                const newMap = new Map(state.selectedAvailableItems);
                const currentQty = newMap.get(itemId) || 0;
                if (currentQty <= 1) {
                    newMap.delete(itemId);
                } else {
                    newMap.set(itemId, currentQty - 1);
                }
                return {
                    selectedAvailableItems: newMap
                };
            }, false, 'planogram/decrementItemQuantity'),
        setSelectedAvailableItems: (items)=>set({
                selectedAvailableItems: items
            }, false, 'planogram/setSelectedAvailableItems'),
        clearSelectedAvailableItems: ()=>set({
                selectedAvailableItems: new Map()
            }, false, 'planogram/clearSelectedAvailableItems'),
        setTargetRowId: (rowId)=>set({
                targetRowId: rowId
            }, false, 'planogram/setTargetRowId'),
        openAvailableProductsSidebar: (rowId)=>{
            set({
                targetRowId: rowId,
                selectedAvailableItems: new Map(),
                availableProductsSidebarOpen: true
            }, false, 'planogram/openAvailableProductsSidebar');
        },
        closeAvailableProductsSidebar: ()=>{
            set({
                selectedAvailableItems: new Map(),
                availableProductsSidebarOpen: false
            }, false, 'planogram/closeAvailableProductsSidebar');
        },
        // Sidebar actions
        setSidebarOpen: (open)=>set({
                sidebarOpen: open
            }, false, 'planogram/setSidebarOpen'),
        setSidebarExpanded: (expanded)=>set({
                sidebarExpanded: expanded
            }, false, 'planogram/setSidebarExpanded'),
        toggleSidebar: ()=>set((state)=>({
                    sidebarOpen: !state.sidebarOpen
                }), false, 'planogram/toggleSidebar'),
        toggleSidebarExpand: ()=>set((state)=>({
                    sidebarExpanded: !state.sidebarExpanded
                }), false, 'planogram/toggleSidebarExpand'),
        setAvailableProductsSidebarOpen: (open)=>set({
                availableProductsSidebarOpen: open
            }, false, 'planogram/setAvailableProductsSidebarOpen'),
        setAvailableProductsSidebarExpanded: (expanded)=>set({
                availableProductsSidebarExpanded: expanded
            }, false, 'planogram/setAvailableProductsSidebarExpanded'),
        toggleAvailableProductsSidebar: ()=>set((state)=>({
                    availableProductsSidebarOpen: !state.availableProductsSidebarOpen
                }), false, 'planogram/toggleAvailableProductsSidebar'),
        toggleAvailableProductsSidebarExpand: ()=>set((state)=>({
                    availableProductsSidebarExpanded: !state.availableProductsSidebarExpanded
                }), false, 'planogram/toggleAvailableProductsSidebarExpand'),
        // Download actions
        setDownloadLoading: (loading)=>set({
                downloadLoading: loading
            }, false, 'planogram/setDownloadLoading'),
        downloadPlanogram: async (planogram, gridData)=>{
            set({
                downloadLoading: true
            }, false, 'planogram/downloadStart');
            try {
                const { generatePlanogramCSV } = await __turbopack_context__.A("[project]/lib/planogramCSV.ts [app-client] (ecmascript, async loader)");
                const csvContent = generatePlanogramCSV(planogram, gridData);
                const blob = new Blob([
                    csvContent
                ], {
                    type: 'text/csv'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const dateStr = new Date().toISOString().split('T')[0];
                a.download = `${planogram.name.replace(/[^a-z0-9]/gi, '_')}-${dateStr}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                const toast = (await __turbopack_context__.A("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript, async loader)")).default;
                toast.success('Planogram downloaded successfully');
            } catch  {
                const toast = (await __turbopack_context__.A("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript, async loader)")).default;
                toast.error('Failed to download planogram');
            } finally{
                set({
                    downloadLoading: false
                }, false, 'planogram/downloadComplete');
            }
        },
        // AI actions
        setAIDialogOpen: (open)=>set({
                aiDialogOpen: open
            }, false, 'planogram/setAIDialogOpen'),
        setAILoading: (loading)=>set({
                aiLoading: loading
            }, false, 'planogram/setAILoading'),
        setAIError: (error)=>set({
                aiError: error
            }, false, 'planogram/setAIError'),
        setAIOverview: (overview)=>set({
                aiOverview: overview
            }, false, 'planogram/setAIOverview'),
        resetAI: ()=>set({
                aiLoading: false,
                aiError: null,
                aiOverview: null
            }, false, 'planogram/resetAI')
    }), {
    name: 'PlanogramStore'
}));
const usePlanogramStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$zustand$2f$create$2d$selectors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectors"])(usePlanogramStoreBase);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramQuery",
    ()=>usePlanogramQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
async function fetchPlanogram(slug) {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/planograms/${slug}/`);
    return data;
}
function usePlanogramQuery(slug) {
    _s();
    const initializeForm = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeForm();
    const initializeLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeLayouts();
    const setLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoading();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'planograms',
            slug
        ],
        queryFn: {
            "usePlanogramQuery.useQuery[query]": ()=>fetchPlanogram(slug)
        }["usePlanogramQuery.useQuery[query]"],
        enabled: !!slug,
        staleTime: 1000 * 60 * 5
    });
    // Initialize form and layouts when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramQuery.useEffect": ()=>{
            if (query.data) {
                const planogram = query.data;
                const displayId = planogram.display?.id?.toString() || undefined;
                initializeForm({
                    name: planogram.name,
                    display_id: displayId,
                    season: planogram.season,
                    shelf_count: planogram.shelf_count,
                    width_in: planogram.width_in,
                    height_in: planogram.height_in,
                    category_ids: planogram.category_ids
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["usePlanogramQuery.useEffect"], [
        query.data?.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramQuery.useEffect": ()=>{
            if (query.data?.layout) {
                initializeLayouts(query.data.layout);
            } else if (!query.isLoading) {
                setLoading(false);
            }
        }
    }["usePlanogramQuery.useEffect"], [
        query.data?.layout,
        query.isLoading,
        initializeLayouts,
        setLoading
    ]);
    return query;
}
_s(usePlanogramQuery, "a2WYGfBTK2h5SdHXDFlUzH61Ec8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramsQuery",
    ()=>usePlanogramsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function usePlanogramsQuery() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"])([
        'planograms'
    ], {
        "usePlanogramsQuery.usePaginatedQuery": async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/planograms/');
            return response.data;
        }
    }["usePlanogramsQuery.usePaginatedQuery"]);
}
_s(usePlanogramsQuery, "8dRrW1kK8lRPrshcMFzQabx/L7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaginatedQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreatePlanogramMutation",
    ()=>useCreatePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useCreatePlanogramMutation() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useCreatePlanogramMutation.useAppMutation": async (input)=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/planograms/', input);
            return response.data;
        }
    }["useCreatePlanogramMutation.useAppMutation"], {
        successMessage: 'Planogram created successfully',
        errorMessage: 'Failed to create planogram',
        invalidateQueries: [
            [
                'planograms'
            ],
            [
                'projects'
            ]
        ]
    });
}
_s(useCreatePlanogramMutation, "Rrkdb75pulkTFL9gRtHlkUL7GMU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpdatePlanogramMutation",
    ()=>useUpdatePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/react-query/hooks.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useUpdatePlanogramMutation() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"])({
        "useUpdatePlanogramMutation.useAppMutation": async (variables)=>{
            const { slug, ...data } = variables;
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/planograms/${slug}/`, data);
            return response.data;
        }
    }["useUpdatePlanogramMutation.useAppMutation"], {
        successMessage: 'Planogram updated successfully',
        errorMessage: 'Failed to update planogram',
        invalidateQueries: [
            [
                'planograms'
            ]
        ],
        onSuccess: {
            "useUpdatePlanogramMutation.useAppMutation": (data)=>{
                queryClient.setQueryData([
                    'planograms',
                    data.slug
                ], data);
                queryClient.invalidateQueries({
                    queryKey: [
                        'planograms',
                        data.slug
                    ]
                });
            }
        }["useUpdatePlanogramMutation.useAppMutation"]
    });
}
_s(useUpdatePlanogramMutation, "PCT2dylvgWBOLOLa2HpT5W+s9FU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$react$2d$query$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeletePlanogramMutation",
    ()=>useDeletePlanogramMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useDeletePlanogramMutation() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeletePlanogramMutation.useMutation": async (variables)=>{
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/planograms/${variables.slug}/`);
            }
        }["useDeletePlanogramMutation.useMutation"],
        onSuccess: {
            "useDeletePlanogramMutation.useMutation": (_data, variables)=>{
                queryClient.removeQueries({
                    queryKey: [
                        'planograms',
                        variables.slug
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'planograms'
                    ]
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Planogram deleted successfully');
            }
        }["useDeletePlanogramMutation.useMutation"],
        onError: {
            "useDeletePlanogramMutation.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || 'Failed to delete planogram');
            }
        }["useDeletePlanogramMutation.useMutation"]
    });
}
_s(useDeletePlanogramMutation, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAIOverviewMutation",
    ()=>useAIOverviewMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
async function fetchAIOverview(variables) {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/planograms/${variables.slug}/ai-overview/`);
    return data.overview;
}
function useAIOverviewMutation() {
    _s();
    const setAILoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAILoading();
    const setAIError = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIError();
    const setAIOverview = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIOverview();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: fetchAIOverview,
        onMutate: {
            "useAIOverviewMutation.useMutation": ()=>{
                setAILoading(true);
                setAIError(null);
            }
        }["useAIOverviewMutation.useMutation"],
        onSuccess: {
            "useAIOverviewMutation.useMutation": (data)=>{
                setAIOverview(data);
                setAILoading(false);
            }
        }["useAIOverviewMutation.useMutation"],
        onError: {
            "useAIOverviewMutation.useMutation": (error)=>{
                if (error instanceof Error) {
                    setAIError(error.message || 'Failed to generate AI overview');
                } else {
                    setAIError('Failed to generate AI overview');
                }
                setAILoading(false);
            }
        }["useAIOverviewMutation.useMutation"]
    });
}
_s(useAIOverviewMutation, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAvailableProductsQuery",
    ()=>useAvailableProductsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
async function fetchAvailableProducts(params) {
    if (params.categoryIds.length === 0) {
        return [];
    }
    const categoryIdsStr = params.categoryIds.join(',');
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${params.season}`);
    const products = data.products || [];
    return products.map((product)=>({
            id: product.id,
            name: product.name,
            category: product.category || 'Unknown',
            color: product.color || '#9ca3af',
            score: product.overall_score || 0,
            margin: product.margin || 0,
            pack_width_in: product.pack_width_in,
            pack_height_in: product.pack_height_in
        }));
}
function useAvailableProductsQuery(params) {
    _s();
    const setAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAvailableItems();
    const setLoadingAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoadingAvailableItems();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'available-products',
            params.categoryIds,
            params.season
        ],
        queryFn: {
            "useAvailableProductsQuery.useQuery[query]": ()=>fetchAvailableProducts(params)
        }["useAvailableProductsQuery.useQuery[query]"],
        enabled: params.categoryIds.length > 0,
        staleTime: 1000 * 60 * 10
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAvailableProductsQuery.useEffect": ()=>{
            setLoadingAvailableItems(query.isLoading);
        }
    }["useAvailableProductsQuery.useEffect"], [
        query.isLoading,
        setLoadingAvailableItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAvailableProductsQuery.useEffect": ()=>{
            if (query.data) {
                setAvailableItems(query.data);
            }
        }
    }["useAvailableProductsQuery.useEffect"], [
        query.data,
        setAvailableItems
    ]);
    return query;
}
_s(useAvailableProductsQuery, "a2WYGfBTK2h5SdHXDFlUzH61Ec8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/schemas/planogram-detail-response-schema.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramDetailResponseSchema",
    ()=>PlanogramDetailResponseSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const PlanogramDetailResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    planogram: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        season: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        category_ids: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()).optional(),
        shelf_count: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        width_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        height_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        depth_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable().optional(),
        shelf_spacing: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable().optional(),
        display: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nullable(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
            width_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
            height_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
            depth_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
            shelf_count: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
        }).nullable().optional(),
        project: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        }).optional(),
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        })),
        created_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        updated_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        created_by: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        }).nullable().optional(),
        updated_by: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
        }).nullable().optional()
    }),
    layout: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        grid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            cols: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            cellWidthIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
        }),
        rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                i: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
                x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                y: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                w: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                h: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                meta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
                    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
                    score: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                    pack_width_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
                    pack_height_in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
                })
            }))
        }))
    }).optional()
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramData",
    ()=>usePlanogramData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/axios.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$schemas$2f$planogram$2d$detail$2d$response$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/schemas/planogram-detail-response-schema.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function usePlanogramData(planogramSlug) {
    _s();
    const initializeForm = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeForm();
    const initializeLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.initializeLayouts();
    const setAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAvailableItems();
    const setLoadingAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setLoadingAvailableItems();
    // Fetch planogram data
    const planogramQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'planograms',
            planogramSlug
        ],
        queryFn: {
            "usePlanogramData.useQuery[planogramQuery]": async ()=>{
                if (!planogramSlug) {
                    throw new Error('Planogram slug is required');
                }
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/planograms/${planogramSlug}/`);
                // Validate response structure matches expected format
                try {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$schemas$2f$planogram$2d$detail$2d$response$2d$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanogramDetailResponseSchema"].parse(data);
                } catch (error) {
                    console.error('Planogram response validation failed:', error);
                    throw new Error('Invalid planogram response format');
                }
            }
        }["usePlanogramData.useQuery[planogramQuery]"],
        enabled: !!planogramSlug,
        staleTime: 1000 * 60 * 5
    });
    // Fetch company displays (custom displays)
    const { data: displaysData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'displays'
        ],
        queryFn: {
            "usePlanogramData.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/displays/');
                return data;
            }
        }["usePlanogramData.useQuery"]
    });
    const companyDisplays = displaysData?.displays || [];
    // Fetch standard displays
    const { data: standardsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'standard-displays'
        ],
        queryFn: {
            "usePlanogramData.useQuery": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/displays/standards/');
                return data;
            }
        }["usePlanogramData.useQuery"]
    });
    const standardDisplays = standardsData?.standards || standardsData || [];
    // Fetch leaf categories (categories that have products directly as children, not subcategories)
    const leafCategoriesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'categories',
            'leaf'
        ],
        queryFn: {
            "usePlanogramData.useQuery[leafCategoriesQuery]": async ()=>{
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/categories/leaf/');
                return data;
            }
        }["usePlanogramData.useQuery[leafCategoriesQuery]"]
    });
    const leafCategories = leafCategoriesQuery.data?.categories || [];
    // Fetch available products
    const fetchAvailableProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePlanogramData.useCallback[fetchAvailableProducts]": async (overridePlanogram)=>{
            const planogram = overridePlanogram || planogramQuery.data?.planogram;
            if (!planogram) {
                return;
            }
            const categoryIds = planogram.category_ids || [];
            const currentSeason = planogram.season || 'summer';
            if (categoryIds.length === 0) {
                setAvailableItems([]);
                return;
            }
            setLoadingAvailableItems(true);
            try {
                const categoryIdsStr = categoryIds.join(',');
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${currentSeason}`);
                const products = response.data.products || [];
                // Convert to AvailableItem format
                const items = products.map({
                    "usePlanogramData.useCallback[fetchAvailableProducts].items": (product)=>({
                            id: product.id,
                            name: product.name,
                            category: product.category || 'Unknown',
                            color: product.color || '#9ca3af',
                            score: product.overall_score || 0,
                            margin: product.margin || 0,
                            pack_width_in: product.pack_width_in,
                            pack_height_in: product.pack_height_in
                        })
                }["usePlanogramData.useCallback[fetchAvailableProducts].items"]);
                setAvailableItems(items);
            } catch (error) {
                console.error('Error fetching available products:', error);
                setAvailableItems([]);
            } finally{
                setLoadingAvailableItems(false);
            }
        }
    }["usePlanogramData.useCallback[fetchAvailableProducts]"], [
        planogramQuery.data,
        setAvailableItems,
        setLoadingAvailableItems
    ]);
    // Initialize form state from planogram data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramData.useEffect": ()=>{
            if (planogramQuery.data?.planogram) {
                const planogram = planogramQuery.data.planogram;
                // Use display ID directly
                const displayId = planogram.display?.id?.toString() || undefined;
                // Initialize form state
                initializeForm({
                    name: planogram.name,
                    display_id: displayId,
                    season: planogram.season,
                    shelf_count: planogram.shelf_count,
                    width_in: planogram.width_in,
                    height_in: planogram.height_in,
                    category_ids: planogram.category_ids
                });
                // Fetch available products when planogram loads
                fetchAvailableProducts();
            }
        // Only depend on planogram ID to avoid infinite loops
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["usePlanogramData.useEffect"], [
        planogramQuery.data?.planogram?.id
    ]);
    // Initialize layouts from planogram data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanogramData.useEffect": ()=>{
            if (planogramQuery.data?.layout) {
                initializeLayouts(planogramQuery.data.layout);
            }
        }
    }["usePlanogramData.useEffect"], [
        planogramQuery.data?.layout,
        initializeLayouts
    ]);
    return {
        planogramData: planogramQuery.data,
        planogramLoading: planogramQuery.isLoading,
        refetchPlanogram: planogramQuery.refetch,
        companyDisplays,
        standardDisplays,
        leafCategories,
        leafCategoriesLoading: leafCategoriesQuery.isLoading,
        leafCategoriesError: leafCategoriesQuery.error?.message,
        fetchAvailableProducts
    };
}
_s(usePlanogramData, "gjPoe/NCEO4JC1cXZJ/Z3Vx6RaU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramForm",
    ()=>usePlanogramForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function usePlanogramForm(planogramSlug, planogramData, refetchPlanogram, fetchAvailableProducts) {
    _s();
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const selectedDisplay = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedDisplay();
    const season = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.season();
    const shelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.shelfCount();
    const widthIn = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.widthIn();
    const heightIn = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.heightIn();
    const selectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedCategoryIds();
    const setName = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setName();
    const setSelectedDisplay = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSelectedDisplay();
    const setSeason = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSeason();
    const setShelfCount = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setShelfCount();
    const setSelectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSelectedCategoryIds();
    const setSkipNextInitialization = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setSkipNextInitialization();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const projectSlug = params?.projectSlug;
    const updateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"])();
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"])();
    // Save layout handler
    const handleSaveLayout = async (layout)=>{
        // Set flag to skip next initialization to prevent flashing
        setSkipNextInitialization(true);
        try {
            await updateMutation.mutateAsync({
                slug: planogramSlug,
                name: planogramData?.planogram.name,
                width_in: planogramData?.planogram.width_in,
                height_in: planogramData?.planogram.height_in,
                shelf_count: planogramData?.planogram.shelf_count,
                layout,
                preserve_layout: true
            });
            await refetchPlanogram();
        } catch  {
        // Error handled by mutation
        }
    };
    // Handle regenerate button click
    const handleRegenerate = async ()=>{
        if (!planogramData?.planogram) {
            return;
        }
        // Validate name is not empty
        if (!name || !name.trim()) {
            return;
        }
        const updates = {};
        // Include name if it changed
        if (name.trim() !== planogramData.planogram.name) {
            updates.name = name.trim();
        }
        // Only include fields that have changed
        if (selectedDisplay) {
            const displayId = parseInt(selectedDisplay, 10);
            const currentDisplayId = planogramData.planogram.display?.id;
            if (displayId !== currentDisplayId) {
                updates.display_id = displayId;
            }
        }
        if (season && season !== planogramData.planogram.season) {
            updates.season = season;
        }
        if (shelfCount > 0 && shelfCount !== (planogramData.planogram.shelf_count ?? 1)) {
            updates.shelf_count = shelfCount;
        }
        if (selectedCategoryIds.length > 0) {
            const currentIds = planogramData.planogram.category_ids || [];
            if (JSON.stringify(selectedCategoryIds.sort()) !== JSON.stringify(currentIds.sort())) {
                updates.category_ids = selectedCategoryIds;
            }
        }
        // Always set preserve_layout to false when regenerating
        updates.preserve_layout = false;
        // Only make request if there are changes
        if (Object.keys(updates).length > 0) {
            try {
                const result = await updateMutation.mutateAsync({
                    slug: planogramSlug,
                    name: name.trim(),
                    width_in: widthIn,
                    height_in: heightIn,
                    shelf_count: shelfCount > 0 ? shelfCount : planogramData.planogram.shelf_count ?? 1,
                    ...updates
                });
                if (result) {
                    const updatedPlanogram = result;
                    // Update state directly from the response
                    if (updatedPlanogram.name) {
                        setName(updatedPlanogram.name);
                    }
                    if (updatedPlanogram.display?.id) {
                        setSelectedDisplay(updatedPlanogram.display.id.toString());
                    }
                    if (updatedPlanogram.season) {
                        setSeason(updatedPlanogram.season);
                    }
                    // Always update shelf_count, default to 1 if missing
                    setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
                    if (updatedPlanogram.category_ids) {
                        setSelectedCategoryIds(updatedPlanogram.category_ids);
                    }
                    // Refetch available products after regeneration (in case season or categories changed)
                    await fetchAvailableProducts(updatedPlanogram);
                    // Refetch to get latest state
                    await refetchPlanogram();
                    // Update URL if slug changed (slug is generated from name)
                    if (updatedPlanogram.slug && updatedPlanogram.slug !== planogramSlug) {
                        router.push(`/dashboard/projects/${projectSlug}/planograms/${updatedPlanogram.slug}`);
                    }
                }
            } catch  {
            // Error handled by mutation
            }
        }
    };
    // Handle display change - regenerate planogram immediately
    const handleDisplayChange = async (displayId)=>{
        setSelectedDisplay(displayId);
        // Trigger regeneration when display changes
        if (planogramData?.planogram) {
            try {
                const result = await updateMutation.mutateAsync({
                    slug: planogramSlug,
                    name: planogramData.planogram.name,
                    width_in: planogramData.planogram.width_in,
                    height_in: planogramData.planogram.height_in,
                    shelf_count: planogramData.planogram.shelf_count,
                    display_id: parseInt(displayId, 10),
                    preserve_layout: false
                });
                if (result) {
                    const updatedPlanogram = result;
                    // Update shelf count from the new display
                    setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
                    await refetchPlanogram();
                }
            } catch  {
            // Error handled by mutation
            }
        }
    };
    return {
        updatePlanogramMutation: updateMutation,
        deleteMutation,
        handleSaveLayout,
        handleRegenerate,
        handleDisplayChange
    };
}
_s(usePlanogramForm, "jYWGmn4fLlgvkmT/OWs71BcPle0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-planogram-layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanogramLayout",
    ()=>usePlanogramLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
;
// Helper function to calculate width in cells (matches backend logic)
// Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
function widthCellsFor(widthIn, cellWidthIn) {
    if (widthIn <= 0) {
        return 0;
    }
    if (widthIn < 12) {
        return 1;
    }
    // For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
    return Math.max(2, Math.floor(widthIn / cellWidthIn));
}
function usePlanogramLayout() {
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const rowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowLayouts();
    const setRowLayouts = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setRowLayouts();
    const availableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.availableItems();
    const selectedAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedAvailableItems();
    const targetRowId = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.targetRowId();
    const clearSelectedAvailableItems = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.clearSelectedAvailableItems();
    const closeAvailableProductsSidebar = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.closeAvailableProductsSidebar();
    // Handle adding selected items to a row
    const handleAddSelectedItems = ()=>{
        if (!gridData || targetRowId === null || selectedAvailableItems.size === 0) {
            return;
        }
        const maxCols = gridData.grid.cols;
        const newItems = [];
        // Loop through each selected item and its quantity
        selectedAvailableItems.forEach((quantity, itemId)=>{
            const item = availableItems.find((i)=>i.id === itemId);
            if (!item) {
                return;
            }
            // Add the item 'quantity' number of times
            for(let i = 0; i < quantity; i++){
                const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);
                // Always try to place in the target row first
                let placed = false;
                let finalX = 0;
                let finalRowId = targetRowId;
                // Get the target row
                const targetRow = gridData.rows.find((r)=>r.id === targetRowId);
                if (targetRow) {
                    const rowLayout = rowLayouts[targetRowId] && rowLayouts[targetRowId].length > 0 ? rowLayouts[targetRowId] : targetRow.items;
                    // Combine existing items with items we're adding in this batch (for collision detection)
                    const itemsInThisRow = newItems.filter((item)=>item.y + 1 === targetRowId);
                    const allItemsInRow = [
                        ...rowLayout,
                        ...itemsInThisRow
                    ];
                    // Try to find a position from left to right, starting from x=0
                    let testX = 0;
                    while(testX + itemWidth <= maxCols){
                        // Check for collisions with existing items and items we're adding
                        const hasCollision = allItemsInRow.some((existingItem)=>{
                            const existingRight = existingItem.x + existingItem.w;
                            const itemRight = testX + itemWidth;
                            return testX >= existingItem.x && testX < existingRight || itemRight > existingItem.x && itemRight <= existingRight || testX < existingItem.x && itemRight > existingRight;
                        });
                        if (!hasCollision) {
                            // Found a good position!
                            finalX = testX;
                            finalRowId = targetRowId;
                            placed = true;
                            break;
                        }
                        testX++;
                    }
                    // If no perfect position found in target row, place at the rightmost position (allow overflow)
                    if (!placed) {
                        const rightmostX = allItemsInRow.length > 0 ? Math.max(...allItemsInRow.map((item)=>item.x + item.w)) : 0;
                        finalX = rightmostX;
                        finalRowId = targetRowId;
                        placed = true;
                    }
                }
                // Add the item
                const finalRow = gridData.rows.find((r)=>r.id === finalRowId);
                if (finalRow) {
                    // Use timestamp-based unique ID to avoid duplicates
                    const timestamp = Date.now();
                    const randomSuffix = Math.random().toString(36).substring(2, 9);
                    const uniqueId = `${item.id}-${timestamp}-${randomSuffix}`;
                    newItems.push({
                        i: uniqueId,
                        x: finalX,
                        y: finalRowId - 1,
                        w: itemWidth,
                        h: 1,
                        meta: {
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            color: item.color || '#9ca3af',
                            score: item.score,
                            pack_width_in: item.pack_width_in,
                            pack_height_in: item.pack_height_in
                        }
                    });
                }
            }
        });
        // Group new items by row and update rowLayouts
        const itemsByRow = {};
        newItems.forEach((item)=>{
            const rowId = item.y + 1; // Convert y back to rowId
            if (!itemsByRow[rowId]) {
                itemsByRow[rowId] = [];
            }
            itemsByRow[rowId].push(item);
        });
        // Update each affected row
        if (Object.keys(itemsByRow).length > 0) {
            const updated = {
                ...rowLayouts
            };
            Object.entries(itemsByRow).forEach(([rowIdStr, items])=>{
                const rowId = parseInt(rowIdStr);
                const row = gridData.rows.find((r)=>r.id === rowId);
                const existingRowLayout = updated[rowId] || row?.items || [];
                updated[rowId] = [
                    ...existingRowLayout,
                    ...items
                ];
            });
            setRowLayouts(updated);
            // Clear selections and close sidebar
            clearSelectedAvailableItems();
            closeAvailableProductsSidebar();
        }
    };
    return {
        handleAddSelectedItems
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/use-grid-actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGridActions",
    ()=>useGridActions
]);
// Helper function to calculate width in cells (matches backend logic)
// Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
function widthCellsFor(widthIn, cellWidthIn) {
    if (widthIn <= 0) {
        return 0;
    }
    if (widthIn < 12) {
        return 1;
    }
    // For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
    return Math.max(2, Math.floor(widthIn / cellWidthIn));
}
function useGridActions({ gridData, rowLayouts, setRowLayouts, setSelectedItem, setRowNotifications, selectedItem }) {
    const handleLayoutChange = (rowId, newLayout)=>{
        setRowLayouts((prev)=>{
            // Get current layout from state, or fallback to gridData, or empty array
            const currentLayout = prev[rowId] || gridData?.rows.find((r)=>r.id === rowId)?.items || [];
            // If currentLayout is empty, don't process (wait for proper initialization)
            if (currentLayout.length === 0) {
                return prev;
            }
            // Create a map of existing items by their id for faster lookup
            const existingItemsMap = new Map(currentLayout.map((item)=>[
                    item.i,
                    item
                ]));
            // Also create a map from gridData as ultimate fallback
            const gridDataRow = gridData?.rows.find((r)=>r.id === rowId);
            const gridDataItemsMap = gridDataRow ? new Map(gridDataRow.items.map((item)=>[
                    item.i,
                    item
                ])) : new Map();
            // Merge new layout positions with existing meta data
            const updatedLayout = newLayout.map((newItem)=>{
                // First try to find in current layout state
                const existingItem = existingItemsMap.get(newItem.i);
                if (existingItem && existingItem.meta && existingItem.meta.name) {
                    // Preserve all existing meta data, only update position/size
                    return {
                        ...newItem,
                        meta: existingItem.meta
                    };
                }
                // If not found in state, try to get from gridData as fallback
                const gridDataItem = gridDataItemsMap.get(newItem.i);
                if (gridDataItem && gridDataItem.meta && gridDataItem.meta.name) {
                    return {
                        ...newItem,
                        meta: gridDataItem.meta
                    };
                }
                // If we still can't find it, skip updating this item (don't create Unknown)
                // This prevents corruption of the layout
                console.warn(`Item ${newItem.i} not found in currentLayout or gridData, skipping update`);
                return existingItem || gridDataItem || newItem;
            });
            return {
                ...prev,
                [rowId]: updatedLayout
            };
        });
    };
    const handleItemClick = (rowId, itemId, x, y, editMode)=>{
        if (editMode) {
            setSelectedItem({
                rowId,
                itemId,
                x,
                y
            });
        }
    };
    const handleRemoveItem = (itemId)=>{
        if (!gridData || !selectedItem) {
            return;
        }
        const row = gridData.rows.find((r)=>r.id === selectedItem.rowId);
        if (!row) {
            return;
        }
        const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
        const itemToRemove = currentLayout.find((item)=>item.i === itemId);
        if (!itemToRemove) {
            return;
        }
        // Remove from grid
        setRowLayouts((prev)=>({
                ...prev,
                [selectedItem.rowId]: currentLayout.filter((item)=>item.i !== itemId)
            }));
        setSelectedItem(null);
    };
    const handleReplaceItem = (oldItemId, newItem)=>{
        if (!gridData || !selectedItem) {
            return;
        }
        const row = gridData.rows.find((r)=>r.id === selectedItem.rowId);
        if (!row) {
            return;
        }
        const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
        const oldItem = currentLayout.find((item)=>item.i === oldItemId);
        if (!oldItem) {
            return;
        }
        // Calculate new width
        const newWidth = widthCellsFor(newItem.pack_width_in, gridData.grid.cellWidthIn);
        // Replace item
        setRowLayouts((prev)=>({
                ...prev,
                [selectedItem.rowId]: currentLayout.map((item)=>item.i === oldItemId ? {
                        ...item,
                        i: String(newItem.id),
                        w: newWidth,
                        meta: {
                            id: newItem.id,
                            name: newItem.name,
                            category: newItem.category,
                            color: newItem.color,
                            score: newItem.score,
                            pack_width_in: newItem.pack_width_in,
                            pack_height_in: newItem.pack_height_in
                        }
                    } : item)
            }));
        setSelectedItem(null);
    };
    const handleAddItem = (rowId, item)=>{
        if (!gridData) {
            return;
        }
        const currentLayout = rowLayouts[rowId] || gridData.rows.find((r)=>r.id === rowId)?.items || [];
        // Calculate item width in cells
        const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);
        const maxCols = gridData.grid.cols;
        // Check if item fits at all
        if (itemWidth > maxCols) {
            setRowNotifications((prev)=>({
                    ...prev,
                    [rowId]: `"${item.name}" is too wide to fit on the shelf.`
                }));
            // Clear notification after 3 seconds
            setTimeout(()=>{
                setRowNotifications((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[rowId];
                    return updated;
                });
            }, 3000);
            return;
        }
        // Find the rightmost position of existing items
        const rightmostX = currentLayout.length > 0 ? Math.max(...currentLayout.map((item)=>item.x + item.w)) : 0;
        // Generate unique ID for this item instance
        const existingCount = currentLayout.filter((layoutItem)=>layoutItem.meta.id === item.id).length;
        const uniqueId = existingCount > 0 ? `${item.id}-${existingCount}` : String(item.id);
        const newItem = {
            i: uniqueId,
            x: rightmostX,
            y: rowId - 1,
            w: itemWidth,
            h: 1,
            meta: {
                id: item.id,
                name: item.name,
                category: item.category,
                color: item.color,
                score: item.score,
                pack_width_in: item.pack_width_in,
                pack_height_in: item.pack_height_in
            }
        };
        // Check if item fits at the end
        if (rightmostX + itemWidth <= maxCols) {
            // Item fits
            setRowLayouts((prev)=>({
                    ...prev,
                    [rowId]: [
                        ...currentLayout,
                        newItem
                    ]
                }));
            // Clear any existing notification for this row
            setRowNotifications((prev)=>{
                const updated = {
                    ...prev
                };
                delete updated[rowId];
                return updated;
            });
        } else {
            // Item doesn't fit - show inline notification but still add it
            setRowNotifications((prev)=>({
                    ...prev,
                    [rowId]: `"${item.name}" may overflow`
                }));
            // Clear notification after 3 seconds
            setTimeout(()=>{
                setRowNotifications((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[rowId];
                    return updated;
                });
            }, 3000);
            // Still add it - RGL will create a new row if needed
            setRowLayouts((prev)=>({
                    ...prev,
                    [rowId]: [
                        ...currentLayout,
                        newItem
                    ]
                }));
        }
    };
    return {
        handleLayoutChange,
        handleItemClick,
        handleRemoveItem,
        handleReplaceItem,
        handleAddItem
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$grid$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-grid-actions.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground",
            destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Alert;
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = AlertTitle;
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = AlertDescription;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "AlertTitle");
__turbopack_context__.k.register(_c2, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIOverviewDialog",
    ()=>AIOverviewDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function AIOverviewDialog() {
    const aiDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiDialogOpen();
    const setAIDialogOpen = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setAIDialogOpen();
    const aiLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiLoading();
    const aiError = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiError();
    const aiOverview = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.aiOverview();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: aiDialogOpen,
        onOpenChange: setAIDialogOpen,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "AI Overview"
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Analysis and insights for this planogram"
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this),
                        aiError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            variant: "destructive",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                children: aiError
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        aiOverview && !aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose prose-sm max-w-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "whitespace-pre-wrap text-sm leading-relaxed",
                                children: aiOverview
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = AIOverviewDialog;
var _c;
__turbopack_context__.k.register(_c, "AIOverviewDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramDownloadButton",
    ()=>PlanogramDownloadButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
function PlanogramDownloadButton({ planogram }) {
    const downloadLoading = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadLoading();
    const gridData = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.gridData();
    const downloadPlanogram = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.downloadPlanogram();
    const handleDownload = async ()=>{
        if (!planogram) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('No planogram data available');
            return;
        }
        await downloadPlanogram(planogram, gridData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        onClick: handleDownload,
        size: "sm",
        variant: "outline",
        className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        disabled: downloadLoading,
        children: downloadLoading ? 'Preparing...' : 'Download'
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = PlanogramDownloadButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDownloadButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramDeleteButton",
    ()=>PlanogramDeleteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-form.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramDeleteButton() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const projectSlug = params?.projectSlug;
    const [deleteConfirm, setDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { planogramData, refetchPlanogram, fetchAvailableProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const { deleteMutation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"])(planogramSlug, planogramData, refetchPlanogram, fetchAvailableProducts);
    const handleDelete = async ()=>{
        if (!deleteConfirm) {
            setDeleteConfirm(true);
            return;
        }
        try {
            await deleteMutation.mutateAsync({
                slug: planogramSlug
            });
            router.push(`/dashboard/projects/${projectSlug}`);
        } catch  {
            setDeleteConfirm(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleDelete,
                        disabled: deleteMutation.isPending,
                        variant: deleteConfirm ? 'destructive' : 'outline',
                        className: deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800',
                        children: deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Planogram'
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    deleteConfirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setDeleteConfirm(false),
                        variant: "outline",
                        disabled: deleteMutation.isPending,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            deleteMutation.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                variant: "destructive",
                className: "mt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    children: deleteMutation.error?.message || 'Failed to delete planogram'
                }, void 0, false, {
                    fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(PlanogramDeleteButton, "y+DIItFFDWPMz7OYW1XNSrqOaH0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$form$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramForm"]
    ];
});
_c = PlanogramDeleteButton;
var _c;
__turbopack_context__.k.register(_c, "PlanogramDeleteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/form-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormField",
    ()=>FormField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
function FormField({ label, id, containerClassName, className, ...inputProps }) {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('space-y-2', containerClassName),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                htmlFor: inputId,
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ui/form-field.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                id: inputId,
                className: className,
                ...inputProps
            }, void 0, false, {
                fileName: "[project]/components/ui/form-field.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/form-field.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = FormField;
var _c;
__turbopack_context__.k.register(_c, "FormField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramNameField",
    ()=>PlanogramNameField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/form-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
;
function PlanogramNameField() {
    const name = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.name();
    const setName = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.setName();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$form$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
        label: "Name",
        value: name,
        onChange: (e)=>setName(e.target.value),
        placeholder: "Planogram name",
        required: true,
        containerClassName: "lg:col-span-2"
    }, void 0, false, {
        fileName: "[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = PlanogramNameField;
var _c;
__turbopack_context__.k.register(_c, "PlanogramNameField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/row-header/row-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RowHeader",
    ()=>RowHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
'use client';
;
;
function RowHeader({ rowName, rowId }) {
    const rowNotifications = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.rowNotifications();
    const rowNotification = rowNotifications[rowId];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-semibold",
                    children: rowName
                }, void 0, false, {
                    fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            rowNotification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block",
                children: rowNotification
            }, void 0, false, {
                fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
                lineNumber: 19,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/planogram/components/row-header/row-header.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = RowHeader;
var _c;
__turbopack_context__.k.register(_c, "RowHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "popper", align = "center", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanogramCategoriesSelector",
    ()=>PlanogramCategoriesSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/store/planogram-slice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/hooks/use-planogram-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PlanogramCategoriesSelector() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planogramSlug = params?.planogramSlug;
    const selectedCategoryIds = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.selectedCategoryIds();
    const toggleCategory = __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$planogram$2d$slice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramStore"].use.toggleCategory();
    const { planogramData, leafCategories, leafCategoriesLoading, leafCategoriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"])(planogramSlug);
    const planogram = planogramData?.planogram;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    leafCategoriesError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-destructive",
                        children: [
                            "Error loading categories: ",
                            leafCategoriesError
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this) : leafCategoriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Loading categories..."
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this) : leafCategories.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: "",
                        onValueChange: (value)=>{
                            const categoryId = parseInt(value);
                            if (!selectedCategoryIds.includes(categoryId)) {
                                toggleCategory(categoryId);
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Select category"
                                }, void 0, false, {
                                    fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: leafCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: category.id.toString(),
                                        children: category.name
                                    }, category.id, false, {
                                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "No categories available"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            selectedCategoryIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-4 border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs text-muted-foreground mb-2",
                        children: "Selected Categories"
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: selectedCategoryIds.map((categoryId)=>{
                            const planogramCategory = planogram?.categories?.find((c)=>c.id === categoryId);
                            const leafCategory = leafCategories.find((c)=>c.id === categoryId);
                            const categoryName = planogramCategory?.name || leafCategory?.name || `Category ${categoryId}`;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                className: "inline-flex items-center gap-2",
                                children: [
                                    categoryName,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleCategory(categoryId),
                                        className: "hover:text-destructive cursor-pointer",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                        lineNumber: 66,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, categoryId, true, {
                                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                                lineNumber: 64,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramCategoriesSelector, "DSnaDK4igvKSNUIKrqehmijCMIc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$use$2d$planogram$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramData"]
    ];
});
_c = PlanogramCategoriesSelector;
var _c;
__turbopack_context__.k.register(_c, "PlanogramCategoriesSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/types.ts [app-client] (ecmascript)");
// Components (partial - Phase 7 in progress)
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$ai$2d$overview$2d$dialog$2f$ai$2d$overview$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/ai-overview-dialog/ai-overview-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$download$2d$button$2f$planogram$2d$download$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-download-button/planogram-download-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$delete$2d$button$2f$planogram$2d$delete$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-delete-button/planogram-delete-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$name$2d$field$2f$planogram$2d$name$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-name-field/planogram-name-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$row$2d$header$2f$row$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/row-header/row-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$components$2f$planogram$2d$categories$2d$selector$2f$planogram$2d$categories$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/components/planogram-categories-selector/planogram-categories-selector.tsx [app-client] (ecmascript)"); // TODO: Add remaining components as they are migrated
 // - ItemMenu
 // - PlanogramActions
 // - PlanogramFormFields
 // - PlanogramHeader
 // - ShelvesTable
 // - ProductSidebar
 // - AvailableProductsSidebar
 // - PlanogramGrid (Grid)
 // - Planogram3DView (ThreeJSView)
 // - PlanogramEditor (NEW - main container)
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/planogram/queries/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAIOverviewMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAIOverviewMutation"],
    "useAvailableProductsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAvailableProductsQuery"],
    "useCreatePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreatePlanogramMutation"],
    "useDeletePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeletePlanogramMutation"],
    "usePlanogramQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramQuery"],
    "usePlanogramsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramsQuery"],
    "useUpdatePlanogramMutation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdatePlanogramMutation"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planogram$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planogram-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$planograms$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-planograms-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$create$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-create-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$update$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-update-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$delete$2d$planogram$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-delete-planogram-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$ai$2d$overview$2d$mutation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-ai-overview-mutation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$use$2d$available$2d$products$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/use-available-products-query.ts [app-client] (ecmascript)");
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
;
;
function EmptyState({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "p-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "p-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground text-lg font-medium text-center",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/EmptyState.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/EmptyState.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/EmptyState.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/planograms/components/PlanogramCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function PlanogramCard({ name, slug, projectName, projectSlug, displayName, seasonDisplay, categories, categoryIds }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/dashboard/projects/${projectSlug}/planograms/${slug}`,
        className: "block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-semibold",
                    children: name
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-sm text-muted-foreground",
                children: [
                    projectName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: "Project:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            " ",
                            projectName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: "Display:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            " ",
                            displayName || 'N/A'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: "Season:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "capitalize",
                                children: seasonDisplay
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 40,
                                columnNumber: 72
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: "Categories:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            ' ',
                            categories && categories.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: categories.map((cat)=>cat.name).join(', ')
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    categoryIds.length,
                                    " selected"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/planograms/components/PlanogramCard.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = PlanogramCard;
var _c;
__turbopack_context__.k.register(_c, "PlanogramCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/planograms/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanogramsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/features/planogram/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/planogram/queries/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$planograms$2f$components$2f$PlanogramCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/planograms/components/PlanogramCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function PlanogramsPage() {
    _s();
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramsQuery"])();
    const planograms = data || [];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/dashboard/planograms/page.tsx",
            lineNumber: 14,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
            variant: "destructive",
            className: "mb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                children: error.message || 'Failed to load planograms'
            }, void 0, false, {
                fileName: "[project]/app/dashboard/planograms/page.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/planograms/page.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-2",
                        children: "Planograms"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/planograms/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "View and manage your planograms"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/planograms/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/planograms/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "💡"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/planograms/page.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Note:"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/planograms/page.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                " To create a planogram, navigate to a",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/projects",
                                    className: "text-primary hover:underline",
                                    children: "projects"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/planograms/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                ' ',
                                'page, select a project, then click "Create Planogram".'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/planograms/page.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/planograms/page.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/planograms/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            planograms.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                children: planograms.map((planogram)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$planograms$2f$components$2f$PlanogramCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        name: planogram.name,
                        slug: planogram.slug,
                        projectName: planogram.project?.name || planogram.project_name || 'Unknown',
                        projectSlug: planogram.project?.slug || planogram.project_slug || '',
                        displayName: planogram.display?.name || planogram.display_name || null,
                        seasonDisplay: planogram.season_display || planogram.season,
                        categories: planogram.categories,
                        categoryIds: planogram.category_ids || []
                    }, planogram.id, false, {
                        fileName: "[project]/app/dashboard/planograms/page.tsx",
                        lineNumber: 48,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/planograms/page.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: "No planograms yet"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/planograms/page.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(PlanogramsPage, "DdBfU/lcUjYQ95DRofcR7Y3FBWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$planogram$2f$queries$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanogramsQuery"]
    ];
});
_c = PlanogramsPage;
var _c;
__turbopack_context__.k.register(_c, "PlanogramsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_bd93adcb._.js.map