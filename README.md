---
page_type: sample
description: An Azure Maps Web SDK module that provides a control that makes it easy to bring any data loaded on the map into view.
languages:
- javascript
- typescript
products:
- azure
- azure-maps
---

# Azure Maps Autofocus Control module

An Azure Maps Web SDK module that provides a control that makes it easy to bring any data loaded on the map into view.

## Getting started

Download the project and copy the `azure-maps-autofocus-control` JavaScript file from the `dist` folder into your project.

**Usage**

```JavaScript
// Add the bring data into view control to the map.
map.controls.add(new atlas.control.AutofocusControl());
```

## API Reference

### BringDataIntoViewControl class

Implements: `atlas.Control`

Namespace: `atlas.control`

A control that makes it easy to bring any data loaded on the map into view.

**Constructor**

> `AutofocusControl(options?: AutofocusControlOptions)`

### AutofocusControlOptions interface

Options for the `AutofocusControl`.

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `duration` | `number` | The amount of time over which to animate to the new camera state. Default: `1000` |
| `includeImageLayers` | `boolean` | Specifies if image layer should be included in the data view calculation: Default: `true` |
| `includeMarkers` | `boolean` | Specifies if HTML markers should be included in the data view calculation: Default: `true` |
| `maxZoom` | `integer` | Specifies the maximum zoom level to use when displaying data view collection: Default: `20` |
| `minZoom` | `integer` | Specifies the minimum zoom level to use when displaying data view collection: Default: `1` |
| `padding` | `number` | The amount of pixel padding around the data to account for when setting the map view. Default: `100` |
| `sources` | `(atlas.source.DataSource \| string)[]` | An arrary of data source objects or IDs to focus on. By default this control will calculate the coverage area of DataSource imstances in the map. |
| `style` | `atlas.ControlStyle` \| `string` | The style of the control. Can be; `light`, `dark`, `auto`, or any CSS3 color. When set to auto, the style will change based on the map style. Overridden if device is in high contrast mode. Default `light`. |
| `type` | `atlas.Options` \| `string` | The type of animation to perform. Can be; `jump`, `ease`, or `fly`. Default `jump`. |

Methods

| Name | Return Type | Description |
|------|------|-------------|
| `setOptions(options: AutofocusControlOptions)` | | Sets the options on the control. |

## Related Projects

* [Azure Maps Web SDK Open modules](https://github.com/microsoft/Maps/blob/master/AzureMaps.md#open-web-sdk-modules) - A collection of open source modules that extend the Azure Maps Web SDK.
* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Gov Cloud Web SDK Samples](https://github.com/Azure-Samples/AzureMapsGovCloudCodeSamples)
* [Azure Maps & Azure Active Directory Samples](https://github.com/Azure-Samples/Azure-Maps-AzureAD-Samples)
* [List of open-source Azure Maps projects](https://github.com/microsoft/Maps/blob/master/AzureMaps.md)

## Additional Resources

* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## Contributing

We welcome contributions. Feel free to submit code samples, file issues and pull requests on the repo and we'll address them as we can. 
Learn more about how you can help on our [Contribution Rules & Guidelines](https://github.com/Azure-Samples/azure-maps-bring-data-into-view-control/blob/main/CONTRIBUTING.md). 

You can reach out to us anytime with questions and suggestions using our communities below:
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). 
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or 
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

MIT
 
See [License](https://github.com/Azure-Samples/azure-maps-bring-data-into-view-control/blob/main/LICENSE.md) for full license text.
