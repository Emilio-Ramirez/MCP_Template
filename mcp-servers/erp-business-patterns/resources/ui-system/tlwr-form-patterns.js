export const tlwrFormPatterns = {
  name: "TLWR Form Enhancement Patterns",
  description: "Specialized patterns for Testing Lab Work Request (TLWR) forms including conditional description fields, responsive panel layout fixes, and field organization standardization",
  
  overview: {
    purpose: "Provide enhanced form patterns specifically designed for TLWR testing workflows with complex conditional logic",
    useCase: "TLWR forms with testing specifications, conditional panels, supplier information, and quality control requirements",
    keyFeatures: [
      "Conditional description fields based on chemistry selection",
      "Responsive panel layout fixes for complex conditional content",
      "Field organization standardization following ERP patterns",
      "Advanced toggle sections for testing options",
      "Smart form state management for TLWR-specific requirements"
    ]
  },

  conditionalDescriptionFields: {
    description: "Dynamic description field patterns that appear based on user selections",
    
    chemistryBasedConditionals: `
// ✅ Chemistry-based conditional description fields
const [showSpecialChemistryDesc, setShowSpecialChemistryDesc] = useState(false);
const [showCustomObjectiveDesc, setShowCustomObjectiveDesc] = useState(false);

// Watch for chemistry changes
const chemistry = form.watch('chemistry');
const testObjective = form.watch('testObjective');

// Dynamic description field visibility
useEffect(() => {
  setShowSpecialChemistryDesc(chemistry === 'special' || chemistry === 'custom_blend');
  setShowCustomObjectiveDesc(testObjective === 'custom' || testObjective === 'troubleshooting');
}, [chemistry, testObjective]);

{/* TLWR Chemistry Selection with Conditional Description */}
<div className='space-y-4'>
  <FormField
    control={form.control}
    name='chemistry'
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t('chemistry_type')}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={t('select_chemistry')} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="polyester">{t('polyester')}</SelectItem>
            <SelectItem value="epoxy">{t('epoxy')}</SelectItem>
            <SelectItem value="acrylic">{t('acrylic')}</SelectItem>
            <SelectItem value="polyurethane">{t('polyurethane')}</SelectItem>
            <SelectItem value="special">{t('special_chemistry')}</SelectItem>
            <SelectItem value="custom_blend">{t('custom_blend')}</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Conditional Chemistry Description */}
  {showSpecialChemistryDesc && (
    <div className='animate-in slide-in-from-top-2 duration-200'>
      <FormField
        control={form.control}
        name='chemistryDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('chemistry_specification')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('describe_special_chemistry_requirements')}
                className="resize-none border-dashed"
                rows={3}
              />
            </FormControl>
            <FormDescription>
              {t('provide_detailed_chemistry_specifications')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )}
</div>`,

    testObjectiveConditionals: `
{/* Test Objective with Conditional Description */}
<div className='space-y-4'>
  <FormField
    control={form.control}
    name='testObjective'
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t('test_objective')}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={t('select_test_objective')} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="quality_control">{t('quality_control')}</SelectItem>
            <SelectItem value="product_development">{t('product_development')}</SelectItem>
            <SelectItem value="competitor_analysis">{t('competitor_analysis')}</SelectItem>
            <SelectItem value="troubleshooting">{t('troubleshooting')}</SelectItem>
            <SelectItem value="custom">{t('custom_objective')}</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Conditional Objective Description */}
  {showCustomObjectiveDesc && (
    <div className='animate-in slide-in-from-top-2 duration-200'>
      <FormField
        control={form.control}
        name='objectiveDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {testObjective === 'troubleshooting' 
                ? t('troubleshooting_details') 
                : t('custom_objective_details')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={
                  testObjective === 'troubleshooting'
                    ? t('describe_problem_to_investigate')
                    : t('describe_custom_test_objective')
                }
                className="resize-none border-dashed"
                rows={4}
              />
            </FormControl>
            <FormDescription>
              {testObjective === 'troubleshooting'
                ? t('include_symptoms_and_suspected_causes')
                : t('provide_detailed_test_requirements')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )}
</div>`,

    supplierBasedConditionals: `
{/* Supplier Information with Conditional Fields */}
<div className='space-y-4'>
  <FormField
    control={form.control}
    name='sampleSource'
    render={({ field }) => (
      <FormItem>
        <FormLabel>{t('sample_source')}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={t('select_sample_source')} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="client_provided">{t('client_provided')}</SelectItem>
            <SelectItem value="supplier_provided">{t('supplier_provided')}</SelectItem>
            <SelectItem value="market_sample">{t('market_sample')}</SelectItem>
            <SelectItem value="internal_production">{t('internal_production')}</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Conditional Supplier Information */}
  {(sampleSource === 'supplier_provided' || sampleSource === 'market_sample') && (
    <div className='animate-in slide-in-from-top-2 duration-200 space-y-4'>
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

      <FormField
        control={form.control}
        name='supplierProductCode'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('supplier_product_code')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('supplier_part_number')} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='supplierNotes'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('supplier_information')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('additional_supplier_details')}
                className="resize-none border-dashed"
                rows={2}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )}
</div>`
  },

  responsivePanelLayoutFixes: {
    description: "Responsive layout solutions for complex TLWR conditional panels",
    
    adaptiveGridSystem: `
{/* ✅ Adaptive Grid System for TLWR Forms */}
<Card>
  <CardHeader>
    <CardTitle>{t('testing_specifications')}</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Responsive grid that adapts to content density */}
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
      
      {/* Left Panel: Core Testing Info (8 columns on large screens) */}
      <div className='lg:col-span-8 space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Following field organization: Number → Text → Select → Boolean → Textarea */}
          
          {/* Number fields */}
          <FormField
            control={form.control}
            name='sampleQuantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sample_quantity')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='testDuration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('expected_test_duration_days')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="7" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Text fields */}
          <FormField
            control={form.control}
            name='sampleId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sample_identification')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="TLWR-2024-001" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='batchNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('batch_number')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('if_applicable')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select fields */}
          <FormField
            control={form.control}
            name='testPriority'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('test_priority')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_priority')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="routine">{t('routine')}</SelectItem>
                    <SelectItem value="urgent">{t('urgent')}</SelectItem>
                    <SelectItem value="rush">{t('rush')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='reportFormat'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('report_format')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_format')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">{t('standard_report')}</SelectItem>
                    <SelectItem value="detailed">{t('detailed_analysis')}</SelectItem>
                    <SelectItem value="summary">{t('summary_only')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Boolean fields grouped */}
        <div className='flex flex-wrap gap-6'>
          <FormField
            control={form.control}
            name='requiresPhotos'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t('include_photos')}</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='returnSample'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t('return_sample_after_testing')}</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confidentialTest'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t('confidential_testing')}</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Textarea fields span full width of left panel */}
        <FormField
          control={form.control}
          name='testDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('test_description')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('describe_what_to_test')}
                  className="resize-none"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Right Panel: Conditional Content (4 columns on large screens) */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Conditional sections stack vertically in right panel */}
        {showSpecialChemistryDesc && (
          <Card className='border-dashed'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>{t('chemistry_details')}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name='chemistryDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t('chemistry_specifications')}
                        className="resize-none text-sm"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {showCustomObjectiveDesc && (
          <Card className='border-dashed'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>{t('objective_details')}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name='objectiveDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t('detailed_objective')}
                        className="resize-none text-sm"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Static reference panel */}
        <Card className='bg-muted/30'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm'>{t('testing_standards')}</CardTitle>
          </CardHeader>
          <CardContent className='text-xs space-y-2'>
            <p><strong>ASTM D3359:</strong> {t('adhesion_test')}</p>
            <p><strong>ASTM B117:</strong> {t('salt_spray_test')}</p>
            <p><strong>ASTM D2794:</strong> {t('impact_test')}</p>
            <p><strong>ISO 2409:</strong> {t('cross_cut_test')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </CardContent>
</Card>`,

    mobileOptimization: `
{/* ✅ Mobile-First Responsive Layout */}
<div className='space-y-6'>
  {/* Mobile: Stack all sections vertically */}
  <div className='block lg:hidden space-y-4'>
    {/* Core testing info */}
    <Card>
      <CardHeader>
        <CardTitle>{t('basic_testing_info')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Single column on mobile */}
        <FormField name='sampleQuantity' />
        <FormField name='sampleId' />
        <FormField name='testPriority' />
        
        {/* Boolean fields in mobile-friendly layout */}
        <div className='space-y-3'>
          <FormField name='requiresPhotos' />
          <FormField name='returnSample' />
          <FormField name='confidentialTest' />
        </div>
        
        <FormField name='testDescription' />
      </CardContent>
    </Card>

    {/* Conditional sections on mobile */}
    {showSpecialChemistryDesc && (
      <Card>
        <CardHeader>
          <CardTitle>{t('chemistry_details')}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField name='chemistryDescription' />
        </CardContent>
      </Card>
    )}
  </div>

  {/* Desktop: Side-by-side layout */}
  <div className='hidden lg:block'>
    {/* Use the adaptive grid system shown above */}
  </div>
</div>`,

    dynamicPanelResizing: `
// ✅ Dynamic panel resizing based on content
const [contentDensity, setContentDensity] = useState<'low' | 'medium' | 'high'>('medium');

// Calculate content density based on active conditionals
useEffect(() => {
  const activeConditionals = [
    showSpecialChemistryDesc,
    showCustomObjectiveDesc, 
    showSupplierInfo
  ].filter(Boolean).length;

  if (activeConditionals === 0) {
    setContentDensity('low');
  } else if (activeConditionals <= 2) {
    setContentDensity('medium');
  } else {
    setContentDensity('high');
  }
}, [showSpecialChemistryDesc, showCustomObjectiveDesc, showSupplierInfo]);

// Dynamic grid classes based on content
const getGridClasses = () => {
  switch (contentDensity) {
    case 'low':
      return 'grid grid-cols-1 gap-6 lg:grid-cols-3'; // More space for main form
    case 'medium':
      return 'grid grid-cols-1 gap-6 lg:grid-cols-12'; // Balanced layout
    case 'high':
      return 'grid grid-cols-1 gap-4'; // Stack everything on complex forms
    default:
      return 'grid grid-cols-1 gap-6 lg:grid-cols-12';
  }
};

<div className={getGridClasses()}>
  <div className={cn(
    'space-y-4',
    contentDensity === 'low' && 'lg:col-span-2',
    contentDensity === 'medium' && 'lg:col-span-8',
    contentDensity === 'high' && 'col-span-1'
  )}>
    {/* Main form content */}
  </div>
  
  {contentDensity !== 'high' && (
    <div className={cn(
      'space-y-4',
      contentDensity === 'low' && 'lg:col-span-1',
      contentDensity === 'medium' && 'lg:col-span-4'
    )}>
      {/* Conditional panels */}
    </div>
  )}
</div>`
  },

  fieldOrganizationStandardization: {
    description: "Standardized field organization patterns specifically for TLWR forms",
    
    tlwrFieldOrder: `
{/* ✅ TLWR Field Organization Pattern */}
{/* Step 1: Basic Testing Information */}
<Card>
  <CardHeader>
    <CardTitle>{t('basic_testing_information')}</CardTitle>
  </CardHeader>
  <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    {/* 1. NUMBER FIELDS FIRST */}
    <FormField
      control={form.control}
      name='sampleQuantity'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('sample_quantity')}</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder="5" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='expectedDuration'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('expected_duration_days')}</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder="7" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* 2. TEXT FIELDS SECOND */}
    <FormField
      control={form.control}
      name='sampleId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('sample_identification')}</FormLabel>
          <FormControl>
            <Input {...field} placeholder="TLWR-2024-001" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

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

    {/* 3. SELECT FIELDS THIRD */}
    <FormField
      control={form.control}
      name='chemistry'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('chemistry_type')}</FormLabel>
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
              <SelectItem value="special">Special Chemistry</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='testObjective'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('test_objective')}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('select_objective')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="quality_control">Quality Control</SelectItem>
              <SelectItem value="r_and_d">R&D Testing</SelectItem>
              <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
              <SelectItem value="custom">Custom Objective</SelectItem>
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
          <FormLabel>{t('finish_type')}</FormLabel>
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
              <SelectItem value="textured">Textured</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* 4. BOOLEAN FIELDS FOURTH */}
    <div className='md:col-span-2'>
      <div className='flex flex-wrap gap-6'>
        <FormField
          control={form.control}
          name='requiresPhotos'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('include_photos_in_report')}</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='returnSample'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('return_sample_after_testing')}</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confidentialTest'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('confidential_testing')}</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='urgentProcessing'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('urgent_processing')}</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>

    {/* 5. TEXTAREA FIELDS LAST - SPAN FULL WIDTH */}
    <div className='md:col-span-2'>
      <FormField
        control={form.control}
        name='testDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('detailed_test_description')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('describe_exactly_what_needs_to_be_tested')}
                className="resize-none"
                rows={4}
              />
            </FormControl>
            <FormDescription>
              {t('include_specific_test_requirements_and_expected_outcomes')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className='md:col-span-2'>
      <FormField
        control={form.control}
        name='specialInstructions'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('special_instructions')}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t('any_special_handling_or_testing_instructions')}
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
</Card>`,

    tlwrTestingSections: `
{/* ✅ TLWR Testing Sections with Field Organization */}
{/* Advanced Testing Options */}
<Card>
  <CardHeader>
    <CardTitle>{t('advanced_testing_options')}</CardTitle>
    <CardDescription>
      {t('select_additional_tests_and_specify_requirements')}
    </CardDescription>
  </CardHeader>
  <CardContent className='space-y-6'>
    {/* Toggle Controls */}
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
        <Switch
          id='adhesion-test'
          checked={showAdhesionTest}
          onCheckedChange={setShowAdhesionTest}
        />
        <div className='flex-1'>
          <Label htmlFor='adhesion-test' className='text-sm font-medium'>
            {t('adhesion_test')}
          </Label>
          <p className='text-xs text-muted-foreground mt-1'>
            {t('cross_cut_or_pull_off_test')}
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
        <Switch
          id='salt-fog-test'
          checked={showSaltFogTest}
          onCheckedChange={setShowSaltFogTest}
        />
        <div className='flex-1'>
          <Label htmlFor='salt-fog-test' className='text-sm font-medium'>
            {t('corrosion_test')}
          </Label>
          <p className='text-xs text-muted-foreground mt-1'>
            {t('salt_spray_corrosion_resistance')}
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
        <Switch
          id='impact-test'
          checked={showImpactTest}
          onCheckedChange={setShowImpactTest}
        />
        <div className='flex-1'>
          <Label htmlFor='impact-test' className='text-sm font-medium'>
            {t('impact_resistance')}
          </Label>
          <p className='text-xs text-muted-foreground mt-1'>
            {t('falling_weight_impact_test')}
          </p>
        </div>
      </div>
    </div>

    {/* Conditional Testing Sections */}
    {showAdhesionTest && (
      <Card className='border-dashed'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base'>{t('adhesion_test_specifications')}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Following field organization within section */}
          
          {/* Select fields */}
          <FormField
            control={form.control}
            name='adhesionMethod'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('test_method')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_method')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cross_cut">Cross Cut (ASTM D3359)</SelectItem>
                    <SelectItem value="pull_off">Pull-off (ASTM D4541)</SelectItem>
                    <SelectItem value="tape_test">Tape Test (ISO 2409)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='adhesionStandard'
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
                    <SelectItem value="astm_d3359">ASTM D3359</SelectItem>
                    <SelectItem value="astm_d4541">ASTM D4541</SelectItem>
                    <SelectItem value="iso_2409">ISO 2409</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Textarea spans full width */}
          <div className='md:col-span-2'>
            <FormField
              control={form.control}
              name='adhesionNotes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('adhesion_test_notes')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('specific_requirements_for_adhesion_testing')}
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
    )}
  </CardContent>
</Card>`
  },

  advancedToggleSections: {
    description: "Advanced toggle section patterns for TLWR forms with complex testing requirements",
    
    testingOptionsToggle: `
// ✅ Advanced Testing Options Toggle System
const [testingOptions, setTestingOptions] = useState({
  adhesionTest: false,
  saltFogTest: false,
  impactTest: false,
  thermalTest: false,
  flexibilityTest: false,
  customTest: false
});

// Smart toggle management
const handleTestingOptionChange = (option: string, enabled: boolean) => {
  setTestingOptions(prev => ({
    ...prev,
    [option]: enabled
  }));

  // Clear fields when toggling off
  if (!enabled) {
    clearTestingOptionFields(option);
  }

  // Auto-enable related tests
  if (enabled && option === 'saltFogTest') {
    // Salt fog often requires adhesion pre-test
    setTestingOptions(prev => ({
      ...prev,
      adhesionTest: true
    }));
  }
};

const getTestingOptionFields = (option: string): string[] => {
  const fieldMap = {
    adhesionTest: ['adhesionMethod', 'adhesionStandard', 'adhesionNotes'],
    saltFogTest: ['saltFogHours', 'saltFogStandard', 'saltFogEvaluation', 'saltFogNotes'],
    impactTest: ['impactEnergy', 'impactHeight', 'impactStandard', 'impactNotes'],
    thermalTest: ['thermalCycles', 'tempRange', 'thermalStandard', 'thermalNotes'],
    flexibilityTest: ['bendRadius', 'flexStandard', 'flexNotes'],
    customTest: ['customTestName', 'customTestDescription', 'customTestStandard']
  };
  return fieldMap[option] || [];
};

{/* Testing Options Interface */}
<Card>
  <CardHeader>
    <CardTitle>{t('testing_specifications')}</CardTitle>
    <CardDescription>
      {t('select_required_tests_and_specify_parameters')}
    </CardDescription>
  </CardHeader>
  <CardContent className='space-y-6'>
    {/* Testing Options Grid */}
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
      {Object.entries(testingOptions).map(([key, enabled]) => (
        <div 
          key={key}
          className={cn(
            'flex items-center space-x-3 p-4 border rounded-lg transition-all duration-200',
            enabled 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-border hover:bg-accent/50'
          )}
        >
          <Switch
            id={key}
            checked={enabled}
            onCheckedChange={(value) => handleTestingOptionChange(key, value)}
          />
          <div className='flex-1'>
            <Label htmlFor={key} className='text-sm font-medium cursor-pointer'>
              {t(\`testing_option_\${key}\`)}
            </Label>
            <p className='text-xs text-muted-foreground mt-1'>
              {t(\`testing_description_\${key}\`)}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Dynamic Test Sections */}
    <div className='space-y-4'>
      {testingOptions.adhesionTest && (
        <AdhesionTestSection form={form} />
      )}
      
      {testingOptions.saltFogTest && (
        <SaltFogTestSection form={form} />
      )}
      
      {testingOptions.impactTest && (
        <ImpactTestSection form={form} />
      )}
      
      {testingOptions.thermalTest && (
        <ThermalTestSection form={form} />
      )}
      
      {testingOptions.flexibilityTest && (
        <FlexibilityTestSection form={form} />
      )}
    
      {testingOptions.customTest && (
        <CustomTestSection form={form} />
      )}
    </div>
  </CardContent>
</Card>`,

    smartTestCoordination: `
// ✅ Smart Test Coordination Logic
const useTestCoordination = () => {
  // Coordinate related tests automatically
  const coordinateTests = useCallback((changedTest: string, enabled: boolean) => {
    const testRelationships = {
      saltFogTest: {
        requires: ['adhesionTest'], // Salt fog requires adhesion baseline
        suggests: ['impactTest'],   // Often tested together
      },
      thermalTest: {
        requires: ['flexibilityTest'], // Thermal affects flexibility
        conflicts: ['impactTest'],     // Usually separate test campaigns
      },
      impactTest: {
        suggests: ['adhesionTest'],
        conflicts: ['thermalTest'],
      }
    };

    const relationship = testRelationships[changedTest];
    if (!relationship) return;

    if (enabled) {
      // Auto-enable required tests
      relationship.requires?.forEach(requiredTest => {
        setTestingOptions(prev => ({
          ...prev,
          [requiredTest]: true
        }));
        toast.info(t('auto_enabled_required_test', { test: requiredTest }));
      });

      // Suggest related tests
      relationship.suggests?.forEach(suggestedTest => {
        if (!testingOptions[suggestedTest]) {
          toast.info(t('consider_adding_test', { test: suggestedTest }), {
            action: {
              label: t('add'),
              onClick: () => handleTestingOptionChange(suggestedTest, true)
            }
          });
        }
      });

      // Warn about conflicts
      relationship.conflicts?.forEach(conflictTest => {
        if (testingOptions[conflictTest]) {
          toast.warning(t('test_conflict_warning', { 
            test1: changedTest, 
            test2: conflictTest 
          }));
        }
      });
    }
  }, [testingOptions]);

  return { coordinateTests };
};`
  },

  smartFormStateManagement: {
    description: "Intelligent form state management for TLWR-specific requirements",
    
    tlwrStateManager: `
// ✅ TLWR Form State Management Hook
const useTLWRFormState = (form: UseFormReturn<TLWRFormValues>) => {
  const [formState, setFormState] = useState({
    currentPhase: 'basic_info', // basic_info, testing_specs, conditions
    completedSections: new Set<string>(),
    validationWarnings: [] as string[],
    autoSaveEnabled: true
  });

  // Auto-completion tracking
  const trackSectionCompletion = useCallback(async (sectionName: string) => {
    const sectionFields = getTLWRSectionFields(sectionName);
    const values = form.getValues();
    
    const isComplete = sectionFields.every(field => {
      const value = values[field];
      return value !== undefined && value !== '' && value !== null;
    });

    if (isComplete) {
      setFormState(prev => ({
        ...prev,
        completedSections: new Set([...prev.completedSections, sectionName])
      }));
    } else {
      setFormState(prev => {
        const newCompleted = new Set(prev.completedSections);
        newCompleted.delete(sectionName);
        return { ...prev, completedSections: newCompleted };
      });
    }
  }, [form]);

  // Intelligent field suggestions
  const provideSuggestions = useCallback(() => {
    const values = form.getValues();
    const suggestions = [];

    // Chemistry-based suggestions
    if (values.chemistry === 'polyester' && !values.thermalTest) {
      suggestions.push({
        type: 'suggestion',
        message: t('polyester_thermal_test_recommendation'),
        action: () => handleTestingOptionChange('thermalTest', true)
      });
    }

    // Sample size suggestions
    if (values.sampleQuantity > 10 && values.testPriority === 'routine') {
      suggestions.push({
        type: 'warning',
        message: t('large_sample_size_priority_mismatch'),
        action: () => form.setValue('testPriority', 'urgent')
      });
    }

    // Test combination suggestions
    if (values.adhesionTest && values.saltFogTest && !values.impactTest) {
      suggestions.push({
        type: 'suggestion',
        message: t('complete_performance_test_suggestion'),
        action: () => handleTestingOptionChange('impactTest', true)
      });
    }

    setFormState(prev => ({ ...prev, validationWarnings: suggestions }));
  }, [form.watch()]);

  // Auto-save with debouncing
  const autoSave = useMemo(
    () => debounce((data: TLWRFormValues) => {
      if (formState.autoSaveEnabled) {
        localStorage.setItem('tlwr_form_draft', JSON.stringify(data));
        toast.success(t('draft_saved'), { duration: 1000 });
      }
    }, 2000),
    [formState.autoSaveEnabled]
  );

  // Watch for changes and auto-save
  useEffect(() => {
    const subscription = form.watch((data) => {
      autoSave(data as TLWRFormValues);
      provideSuggestions();
    });

    return () => subscription.unsubscribe();
  }, [form, autoSave, provideSuggestions]);

  return {
    formState,
    trackSectionCompletion,
    setAutoSave: (enabled: boolean) => 
      setFormState(prev => ({ ...prev, autoSaveEnabled: enabled }))
  };
};`,

    progressTracking: `
// ✅ TLWR Progress Tracking Component
const TLWRProgressTracker = ({ formState, currentSection }) => {
  const sections = [
    { 
      id: 'basic_info', 
      name: 'Basic Information', 
      icon: FileText,
      fields: ['sampleId', 'chemistry', 'testObjective']
    },
    { 
      id: 'testing_specs', 
      name: 'Testing Specifications', 
      icon: TestTube,
      fields: ['testingOptions', 'specifications']
    },
    { 
      id: 'conditions', 
      name: 'Conditions & Timeline', 
      icon: Clock,
      fields: ['priority', 'deadline', 'instructions']
    }
  ];

  const calculateProgress = () => {
    const totalSections = sections.length;
    const completedSections = formState.completedSections.size;
    return Math.round((completedSections / totalSections) * 100);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {t('tlwr_form_progress')}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {calculateProgress()}% {t('complete')}
          </span>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            const isCompleted = formState.completedSections.has(section.id);
            const isCurrent = currentSection === section.id;
            
            return (
              <div
                key={section.id}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md text-xs transition-colors",
                  isCurrent && "bg-primary/10 border border-primary/20",
                  isCompleted && "bg-green-50 border border-green-200 text-green-700",
                  !isCompleted && !isCurrent && "bg-muted/50"
                )}
              >
                <Icon className={cn(
                  "h-3 w-3",
                  isCompleted ? "text-green-600" : 
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )} />
                <span className="font-medium">{section.name}</span>
                {isCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
              </div>
            );
          })}
        </div>
        
        {/* Show suggestions */}
        {formState.validationWarnings.length > 0 && (
          <div className="mt-3 space-y-1">
            {formState.validationWarnings.map((warning, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <AlertCircle className="h-3 w-3 text-amber-500" />
                <span className="text-muted-foreground">{warning.message}</span>
                {warning.action && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-5 px-2 text-xs"
                    onClick={warning.action}
                  >
                    {t('apply')}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};`
  },

  bestPractices: [
    "Follow field organization pattern within all TLWR sections: Number → Text → Select → Boolean → Textarea",
    "Use conditional description fields based on chemistry and objective selections",
    "Implement responsive panel layouts that adapt to content density",
    "Provide smart test coordination with automatic suggestions",
    "Use toggle sections for optional testing requirements",
    "Implement progress tracking with section completion indicators",
    "Provide intelligent form state management with auto-save",
    "Use appropriate components: Switch for on/off, Checkbox for selections",
    "Implement smooth animations for conditional sections",
    "Provide clear visual feedback for form completion status",
    "Use debounced auto-save to prevent performance issues",
    "Implement smart field suggestions based on user selections"
  ],

  commonIssues: [
    {
      problem: "Conditional panels cause layout jumps",
      solution: "Use consistent Card layouts and animate-in classes for smooth transitions"
    },
    {
      problem: "Form becomes slow with many conditional sections",
      solution: "Use useMemo for expensive calculations and debounce state updates"
    },
    {
      problem: "Fields not clearing when toggle sections disabled",
      solution: "Implement clearTestingOptionFields function that resets specific field groups"
    },
    {
      problem: "Mobile layout breaks with complex panels",
      solution: "Use mobile-first responsive design with vertical stacking on small screens"
    },
    {
      problem: "Test coordination becoming too complex",
      solution: "Keep relationships simple and provide clear user feedback for auto-changes"
    }
  ],

  debuggingTips: [
    "Log conditional states and form values to track rendering logic",
    "Test all toggle combinations to ensure proper field clearing",
    "Verify responsive behavior works across all screen sizes",
    "Check that form state management doesn't cause performance issues",
    "Test auto-save functionality with various form states",
    "Validate that test coordination logic works as expected",
    "Ensure progress tracking accurately reflects form completion"
  ]
};

export default tlwrFormPatterns;