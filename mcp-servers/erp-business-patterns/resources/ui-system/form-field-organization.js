export const formFieldOrganization = {
  name: "Form Field Organization Pattern",
  description: "Standardized field organization pattern for consistent form layouts with mandatory field type ordering and responsive design principles",
  
  overview: {
    purpose: "Establish consistent field organization across all forms to improve user experience and maintain visual hierarchy",
    useCase: "All ERP forms including LWR, TLWR, VLWR, and configuration forms",
    keyPrinciples: [
      "Mandatory field type order: Number → Text → Select → Boolean → Textarea",
      "Clean UI standards with consistent spacing and alignment",
      "Responsive layout patterns that work across all screen sizes",
      "Logical grouping of related fields within sections",
      "Visual hierarchy that guides user attention"
    ]
  },

  mandatoryFieldOrder: {
    description: "Standardized field type ordering that must be followed in all forms",
    
    orderPattern: `
// ✅ MANDATORY ORDER: Number → Text → Select → Boolean → Textarea
1. Number fields (IDs, quantities, measurements)
2. Text fields (names, descriptions, codes)
3. Select fields (dropdowns, choices)
4. Boolean fields (checkboxes, switches)
5. Textarea fields (long descriptions, notes)`,

    implementationExample: `
{/* Step 1: Number Fields First */}
<FormField
  control={form.control}
  name='sapId'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('sap_id')}</FormLabel>
      <FormControl>
        <Input {...field} type="text" placeholder="12345" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name='taxId'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('tax_id')}</FormLabel>
      <FormControl>
        <Input {...field} type="text" placeholder="RFC123456789" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Step 2: Text Fields */}
<FormField
  control={form.control}
  name='productName'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('product_name')}</FormLabel>
      <FormControl>
        <Input {...field} placeholder={t('enter_product_name')} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name='code'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('product_code')}</FormLabel>
      <FormControl>
        <Input {...field} placeholder="ABC123" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Step 3: Select Fields */}
<FormField
  control={form.control}
  name='laboratory'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('laboratory')}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t('select_laboratory')} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {LABORATORIES.map((lab) => (
            <SelectItem key={lab.value} value={lab.value}>
              {lab.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name='color'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('color')}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={t('select_color')} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {COLORS.map((color) => (
            <SelectItem key={color.value} value={color.value}>
              {color.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Step 4: Boolean Fields */}
<FormField
  control={form.control}
  name='requiresApproval'
  render={({ field }) => (
    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>{t('requires_approval')}</FormLabel>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name='isUrgent'
  render={({ field }) => (
    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>{t('urgent_request')}</FormLabel>
    </FormItem>
  )}
/>

{/* Step 5: Textarea Fields Last */}
<FormField
  control={form.control}
  name='description'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('description')}</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          placeholder={t('enter_detailed_description')}
          className="resize-none"
          rows={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name='notes'
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('additional_notes')}</FormLabel>
      <FormControl>
        <Textarea
          {...field}
          placeholder={t('optional_notes')}
          className="resize-none"
          rows={3}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`
  },

  responsiveLayoutPatterns: {
    description: "Responsive grid patterns for different field combinations",
    
    singleColumnLayout: `
{/* Single column for mobile and simple forms */}
<CardContent className='space-y-4'>
  {/* Number fields */}
  <FormField name='sapId' />
  <FormField name='taxId' />
  
  {/* Text fields */}
  <FormField name='productName' />
  <FormField name='code' />
  
  {/* Select fields */}
  <FormField name='laboratory' />
  <FormField name='color' />
  
  {/* Boolean fields */}
  <FormField name='requiresApproval' />
  <FormField name='isUrgent' />
  
  {/* Textarea fields */}
  <FormField name='description' />
  <FormField name='notes' />
</CardContent>`,

    twoColumnLayout: `
{/* Two column layout for desktop */}
<CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
  {/* Number fields - Row 1 */}
  <FormField name='sapId' />
  <FormField name='taxId' />
  
  {/* Text fields - Row 2 */}
  <FormField name='productName' />
  <FormField name='code' />
  
  {/* Select fields - Row 3 */}
  <FormField name='laboratory' />
  <FormField name='color' />
  
  {/* Boolean fields - Row 4 (keep together) */}
  <div className='flex items-center space-x-6'>
    <FormField name='requiresApproval' />
    <FormField name='isUrgent' />
  </div>
  <div></div> {/* Empty cell for alignment */}
  
  {/* Textarea fields - Span full width */}
  <div className='md:col-span-2'>
    <FormField name='description' />
  </div>
  <div className='md:col-span-2'>
    <FormField name='notes' />
  </div>
</CardContent>`,

    threeColumnLayout: `
{/* Three column layout for complex forms */}
<CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
  {/* Number fields - Row 1 */}
  <FormField name='sapId' />
  <FormField name='taxId' />
  <FormField name='quantity' />
  
  {/* Text fields - Row 2 */}
  <FormField name='productName' />
  <FormField name='code' />
  <FormField name='batchNumber' />
  
  {/* Select fields - Row 3 */}
  <FormField name='laboratory' />
  <FormField name='color' />
  <FormField name='system' />
  
  {/* Boolean fields - Keep in single row */}
  <div className='flex items-center space-x-4'>
    <FormField name='requiresApproval' />
    <FormField name='isUrgent' />
  </div>
  <div></div> {/* Empty cells for alignment */}
  <div></div>
  
  {/* Textarea fields - Span full width */}
  <div className='lg:col-span-3'>
    <FormField name='description' />
  </div>
  <div className='lg:col-span-3'>
    <FormField name='notes' />
  </div>
</CardContent>`
  },

  fieldGroupingPatterns: {
    description: "Logical grouping strategies within the mandatory field order",
    
    basicInformationGroup: `
{/* Basic Information - Always first group */}
<Card>
  <CardHeader>
    <CardTitle>{t('basic_information')}</CardTitle>
  </CardHeader>
  <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    {/* Number fields first */}
    <FormField name='sapId' />
    <FormField name='taxId' />
    
    {/* Text fields second */}
    <FormField name='customerName' />
    <FormField name='contactName' />
    
    {/* Select fields third */}
    <FormField name='salesAgent' />
    <FormField name='zone' />
  </CardContent>
</Card>`,

    technicalSpecsGroup: `
{/* Technical Specifications - Follow field order within group */}
<Card>
  <CardHeader>
    <CardTitle>{t('technical_specifications')}</CardTitle>
  </CardHeader>
  <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    {/* Number fields first */}
    <FormField name='temperature' />
    <FormField name='sampleSize' />
    
    {/* Text fields second */}
    <FormField name='productCode' />
    <FormField name='batchId' />
    
    {/* Select fields third */}
    <FormField name='chemistry' />
    <FormField name='finish' />
    <FormField name='color' />
    <FormField name='system' />
    
    {/* Boolean fields fourth */}
    <div className='flex items-center space-x-4'>
      <FormField name='requiresTesting' />
      <FormField name='isCustomFormulation' />
    </div>
    
    {/* Textarea fields last - span full width */}
    <div className='md:col-span-2'>
      <FormField name='technicalNotes' />
    </div>
  </CardContent>
</Card>`,

    conditionsAndNotesGroup: `
{/* Conditions and Notes - Usually last group */}
<Card>
  <CardHeader>
    <CardTitle>{t('conditions_and_notes')}</CardTitle>
  </CardHeader>
  <CardContent className='space-y-4'>
    {/* Boolean fields first */}
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <FormField name='requiresApproval' />
      <FormField name='isUrgent' />
      <FormField name='confidentialProject' />
      <FormField name='clientWillProvidePanel' />
    </div>
    
    {/* Textarea fields last */}
    <FormField name='description' />
    <FormField name='additionalNotes' />
  </CardContent>
</Card>`
  },

  lwrFormExample: {
    description: "Complete LWR form implementing the field organization pattern",
    
    implementation: `
{/* LWR Form - Step 2: Specifications */}
{currentStep === 1 && requestType === 'LWR' && (
  <Card>
    <CardHeader>
      <CardTitle>{t('lwr_specifications')}</CardTitle>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* 1. NUMBER FIELDS FIRST */}
      <FormField
        control={form.control}
        name='targetSalesPrice'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('target_sales_price')}</FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0.00" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='cureTemperature'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('cure_temperature')}</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="180" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='cureTime'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('cure_time')}</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="20" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 2. TEXT FIELDS SECOND */}
      <FormField
        control={form.control}
        name='productCode'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('product_code')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder="LWR-2024-001" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 3. SELECT FIELDS THIRD */}
      <FormField
        control={form.control}
        name='chemistry'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('chemistry')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_chemistry')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="polyester">Polyester</SelectItem>
                <SelectItem value="epoxy">Epoxy</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='color'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('color')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_color')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='finish'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('finish')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_finish')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gloss">Gloss</SelectItem>
                <SelectItem value="semi_gloss">Semi-Gloss</SelectItem>
                <SelectItem value="satin">Satin</SelectItem>
                <SelectItem value="matte">Matte</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 4. BOOLEAN FIELDS FOURTH */}
      <FormField
        control={form.control}
        name='requiresApproval'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{t('requires_approval')}</FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='isUrgent'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{t('urgent_request')}</FormLabel>
          </FormItem>
        )}
      />

      {/* 5. TEXTAREA FIELDS LAST - SPAN FULL WIDTH */}
      <div className='md:col-span-2'>
        <FormField
          control={form.control}
          name='technicalRequirements'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('technical_requirements')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('describe_technical_requirements')}
                  className="resize-none"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='md:col-span-2'>
        <FormField
          control={form.control}
          name='additionalNotes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('additional_notes')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('optional_additional_notes')}
                  className="resize-none"
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CardContent>
  </Card>
)}`
  },

  tlwrFormExample: {
    description: "TLWR form demonstrating conditional fields within the organization pattern",
    
    implementation: `
{/* TLWR Form - Step 2: Testing Requirements */}
{currentStep === 1 && requestType === 'TLWR' && (
  <Card>
    <CardHeader>
      <CardTitle>{t('testing_requirements')}</CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      {/* Main fields following order pattern */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* 1. NUMBER FIELDS */}
        <FormField
          control={form.control}
          name='sampleSize'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sample_size')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="10kg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2. TEXT FIELDS */}
        <FormField
          control={form.control}
          name='supplierName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('supplier_name')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('enter_supplier_name')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 3. SELECT FIELDS */}
        <FormField
          control={form.control}
          name='chemistry'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('chemistry')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_chemistry')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="polyester">Polyester</SelectItem>
                  <SelectItem value="epoxy">Epoxy</SelectItem>
                  <SelectItem value="acrylic">Acrylic</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='finish'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('finish')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_finish')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gloss">Gloss</SelectItem>
                  <SelectItem value="semi_gloss">Semi-Gloss</SelectItem>
                  <SelectItem value="textured">Textured</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Conditional Toggle Sections */}
      <div className='space-y-4'>
        {/* Toggle switches - still following boolean field placement */}
        <div className='flex flex-wrap items-center gap-6'>
          <div className='flex items-center space-x-2'>
            <Switch
              id='client-panels'
              checked={showClientPanels}
              onCheckedChange={setShowClientPanels}
            />
            <Label htmlFor='client-panels'>{t('client_panel_section')}</Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              id='salt-fog-test'
              checked={showSaltFogTest}
              onCheckedChange={setShowSaltFogTest}
            />
            <Label htmlFor='salt-fog-test'>{t('salt_fog_test')}</Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              id='impact-test'
              checked={showImpactTest}
              onCheckedChange={setShowImpactTest}
            />
            <Label htmlFor='impact-test'>{t('impact_test')}</Label>
          </div>
        </div>

        {/* Conditional sections maintain field order internally */}
        {showClientPanels && (
          <Card>
            <CardHeader>
              <CardTitle>{t('client_panels')}</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-4'>
              {/* Boolean fields for panel options */}
              <FormField
                control={form.control}
                name='clientSteelPanel'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t('client_steel_panel')}</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='clientAluminumPanel'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t('client_aluminum_panel')}</FormLabel>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {showSaltFogTest && (
          <Card>
            <CardHeader>
              <CardTitle>{t('salt_fog_test')}</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Number field first */}
              <FormField
                control={form.control}
                name='saltFogHours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('test_duration_hours')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select field second */}
              <FormField
                control={form.control}
                name='saltFogStandard'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('test_standard')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('select_standard')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="astm_b117">ASTM B117</SelectItem>
                        <SelectItem value="iso_9227">ISO 9227</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* 5. TEXTAREA FIELDS ALWAYS LAST */}
      <FormField
        control={form.control}
        name='testObjective'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('test_objective')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('describe_test_objective')}
                className="resize-none"
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='specialInstructions'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('special_instructions')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('optional_special_instructions')}
                className="resize-none"
                rows={2}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)}`
  },

  commonMistakes: {
    description: "Common field organization mistakes and how to avoid them",
    
    mistakes: [
      {
        problem: "Random field order",
        example: "Placing select fields before number fields, or textarea fields in the middle",
        solution: "Always follow the mandatory order: Number → Text → Select → Boolean → Textarea"
      },
      {
        problem: "Inconsistent responsive patterns",
        example: "Some forms use 2-column grid, others use flex, leading to visual inconsistency",
        solution: "Use consistent grid patterns: single column for mobile, 2-column for tablet/desktop"
      },
      {
        problem: "Boolean fields mixed throughout form",
        example: "Checkboxes and switches scattered between other field types",
        solution: "Group all boolean fields together after select fields but before textareas"
      },
      {
        problem: "Textarea fields not spanning full width",
        example: "Long description fields constrained to single grid column",
        solution: "Always use md:col-span-2 or lg:col-span-3 for textarea fields"
      },
      {
        problem: "Poor visual hierarchy",
        example: "All fields look the same importance, no grouping or sectioning",
        solution: "Use Cards to group related fields and follow consistent spacing patterns"
      }
    ]
  },

  bestPractices: [
    "ALWAYS follow the mandatory field order: Number → Text → Select → Boolean → Textarea",
    "Use consistent responsive grid patterns across all forms",
    "Group related fields within Cards while maintaining field order",
    "Span textarea fields across full width for better readability",
    "Place boolean fields (checkboxes/switches) together in horizontal layouts",
    "Maintain consistent spacing with space-y-4 for single column, gap-4 for grids",
    "Use semantic field grouping (Basic Info, Technical Specs, Notes) while respecting field order",
    "Implement consistent placeholder text and labels",
    "Always include FormMessage components for validation feedback",
    "Test responsive behavior on all screen sizes"
  ],

  debuggingTips: [
    "Verify field order matches the mandatory pattern in all form sections",
    "Check responsive grid classes work correctly on mobile and desktop",
    "Ensure textarea fields span full width in multi-column layouts",
    "Validate that boolean fields are grouped together horizontally",
    "Test form layout consistency across different request types",
    "Check that conditional sections maintain field order internally",
    "Verify proper spacing and alignment in all form sections"
  ]
};

export default formFieldOrganization;