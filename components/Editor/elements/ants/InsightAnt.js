import { useState } from 'react'
import useSWR from 'swr'
import { insightFetcher, YAHOO_FINANCE_API_URL } from 'lib/fetch'
import Tree from '../components/Tree'

export default ({ attributes, children, selectedIndex }) => {
  const [selectedCompany, setSelectedCompany] = useState(undefined)

  const query = children.props.node.children[0].text
  const { data: { ResultSet: { Result: matches } = {} } = {} } = useSWR(
    `${YAHOO_FINANCE_API_URL}/market/auto-complete?lang=en&region=US&query=${query}`,
    insightFetcher,
  )

  const { data: { finance: { result } = {} } = {} } = useSWR(
    () =>
      selectedCompany
        ? `${YAHOO_FINANCE_API_URL}/stock/v2/get-insights?symbol=${selectedCompany}`
        : null,
    insightFetcher,
  )

  console.log('data')
  console.log(result)
  console.log(matches)

  return (
    <div
      {...attributes}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        color: 'rgba(51,51,51,0.8)',
        marginBottom: 24,
        fontSize: '16px',
      }}
    >
      <div
        {...attributes}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'rgba(51,51,51,0.8)',
          marginBottom: 24,
          fontSize: '16px',
        }}
      >
        <div
          className="div-block-878 up _2 sha"
          style={{ background: '#ffaa84' }}
        >
          <div>IN</div>
        </div>
        {!selectedCompany ? (
          children
        ) : (
          <div className="price">{selectedCompany}</div>
        )}
        {!query && (
          <span
            className="text-field-2 ncod w-input"
            style={{
              color: '#dddddd',
              display: 'inline-block',
              // color: 'grey',
            }}
          >
            Company
          </span>
        )}
      </div>
      {query && !selectedCompany && (
        <div
          className="div-block-895"
          contentEditable={false}
          style={{
            position: 'absolute',
            zIndex: 1,
            width: 'fit-content',
            marginTop: 48,
          }}
        >
          {matches ? (
            matches.map((char, i) => (
              <div
                key={char.name}
                className={`div-block-827-copy-copy ${
                  i === selectedIndex ? 'ok' : ''
                }`}
                onClick={() => setSelectedCompany(char.symbol)}
              >
                <div className="text-block-199">{char.symbol}</div>
              </div>
            ))
          ) : (
            <div className="div-block-827-copy-copy">
              <div className="text-block-199">Loading...</div>
            </div>
          )}
        </div>
      )}
      {selectedCompany &&
        (result ? (
          <Tree data={result} main={selectedCompany} />
        ) : (
          <div>Loading...</div>
        ))}
    </div>
  )
}
