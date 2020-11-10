export default function initializeElements(componentData) {
    switch (componentData.type) {
        case 'Action':
            return {
                id: componentData.id,
                type: 'actionNode',
                data: { label: componentData.title },
                style: {
                    border: '3px solid green',
                    borderRadius: '5%',
                    padding: 10,
                },
                position: componentData.position,
            };
        case 'Generic':
            return {
                id: componentData.id,
                type: 'genericNode',
                data: { label: componentData.title },
                style: {
                    border: '3px solid red',
                    borderRadius: '5%',
                    padding: 10,
                },
                position: componentData.position,
            };
        case 'Reflection':
            return {
                id: componentData.id,
                type: 'reflectionNode',
                data: { label: componentData.title },
                style: {
                    border: '3px solid purple',
                    borderRadius: '5%',
                    padding: 10,
                },
                position: componentData.position,
            };
        case 'Conversation':
            return {
                id: componentData.id,
                type: 'conversationNode',
                data: { label: componentData.title },
                style: {
                    border: '3px solid blue',
                    borderRadius: '5%',
                    padding: 10,
                },
                position: componentData.position,
            };
        default:
            return {
                id: componentData.id,
                type: 'conversationNode',
                data: { label: componentData.title },
                style: {
                    border: '3px solid blue',
                    borderRadius: '5%',
                    padding: 10,
                },
                position: componentData.position,
            };
    }
}
